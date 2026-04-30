import './App.css';
import Sidebar from './components/Sidebar/index.jsx';
import Player from './components/Player/index.jsx';
import Playlist from './components/Playlist/index.jsx';
import Albums from './components/Albums/index.jsx';
import Artists from './components/Artists/index.jsx';
import Favorites from './components/Favorites/index.jsx';
import { useState, useEffect } from 'react';
import { getSongs } from './api/songs.js';
import Songs from './components/Songs/index.jsx';

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem('activePage') ?? 'playlist';
  });
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [shuffledSongs, setShuffledSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    getSongs().then((data) => {
      const savedLikes = JSON.parse(localStorage.getItem('likedIds') ?? '[]');
      const withLikes = data.map((s) => ({
        ...s,
        liked: savedLikes.includes(s.id),
      }));
      setSongs(withLikes);
      const lastId = localStorage.getItem('lastSongId');
      const last = withLikes.find((s) => s.id === Number(lastId));
      setSelectedSong(last ?? withLikes[0]);
    });
  }, []);

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    localStorage.setItem('lastSongId', song.id);
    localStorage.removeItem('currentTime');
  };

  const handleSetActivePage = (page) => {
    setActivePage(page);
    localStorage.setItem('activePage', page);
  };

  const handleLike = (id) => {
    setSongs((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const updated = { ...s, liked: !s.liked };
          setSelectedSong(updated);
          const savedLikes = JSON.parse(
            localStorage.getItem('likedIds') ?? '[]'
          );
          const newLikes = updated.liked
            ? [...savedLikes, id]
            : savedLikes.filter((likedId) => likedId !== id);
          localStorage.setItem('likedIds', JSON.stringify(newLikes));
          return updated;
        }
        return s;
      })
    );
  };

  const handleShuffle = () => {
    if (!shuffle) {
      const arr = [...songs].filter((s) => s.id !== selectedSong.id);
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setShuffledSongs([selectedSong, ...arr]);
    }
    setShuffle((prev) => !prev);
  };

  const handleNext = () => {
    const list = shuffle ? shuffledSongs : songs;
    const currentIndex = list.findIndex((s) => s.id === selectedSong.id);
    if (currentIndex === list.length - 1) {
      if (shuffle) {
        const arr = [...songs];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setShuffledSongs(arr);
        setSelectedSong(arr[0]);
      } else {
        setSelectedSong(songs[0]);
      }
    } else {
      setSelectedSong(list[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const list = shuffle ? shuffledSongs : songs;
    const currentIndex = list.findIndex((s) => s.id === selectedSong.id);
    if (currentIndex === 0) {
      setSelectedSong(list[list.length - 1]);
    } else {
      setSelectedSong(list[currentIndex - 1]);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'playlist':
        return (
          <Playlist
            songs={songs}
            setSelectedSong={handleSelectSong}
            selectedSong={selectedSong}
            isPlaying={isPlaying}
          />
        );
      case 'albums':
        return (
          <Albums
            songs={songs}
            selectedSong={selectedSong}
            isPlaying={isPlaying}
          />
        );
      case 'artists':
        return (
          <Artists
            songs={songs}
            selectedSong={selectedSong}
            isPlaying={isPlaying}
          />
        );
      case 'songs':
        return (
          <Songs
            songs={songs}
            setSelectedSong={handleSelectSong}
            selectedSong={selectedSong}
            isPlaying={isPlaying}
          />
        );
      case 'favorites':
        return <Favorites songs={songs} setSelectedSong={handleSelectSong} />;
      default:
        return (
          <Playlist
            songs={songs}
            setSelectedSong={handleSelectSong}
            selectedSong={selectedSong}
            isPlaying={isPlaying}
          />
        );
    }
  };

  if (!selectedSong) return <div>Завантаження...</div>;

  return (
    <div className='container app'>
      <Player
        songName={selectedSong.title}
        artistName={selectedSong.artist}
        cover={selectedSong.cover}
        audioUrl={selectedSong.audioUrl}
        liked={selectedSong.liked}
        onNext={handleNext}
        onPrev={handlePrevious}
        onLike={() => handleLike(selectedSong.id)}
        repeat={repeat}
        shuffle={shuffle}
        onRepeat={() => setRepeat((prev) => !prev)}
        onShuffle={handleShuffle}
        isPlaying={isPlaying}
        onPlayingChange={setIsPlaying}
      />
      {renderPage()}
      <Sidebar activePage={activePage} setActivePage={handleSetActivePage} />
    </div>
  );
}

export default App;
