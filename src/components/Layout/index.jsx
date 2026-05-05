import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Player from '../Player/index.jsx';
import Sidebar from '../Sidebar/index.jsx';
import { usePlaylists } from '../../context/PlaylistContext.jsx';

export default function Layout() {
  const songs = useLoaderData();
  const navigate = useNavigate();
  const { importFromUrl } = usePlaylists();

  const [songsState, setSongsState] = useState(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedIds') ?? '[]');
    return songs.map((s) => ({ ...s, liked: savedLikes.includes(s.id) }));
  });
  const [selectedSong, setSelectedSong] = useState(() => {
    const lastId = localStorage.getItem('lastSongId');
    const last = songsState.find((s) => s.id === Number(lastId));
    return last ?? songsState[0];
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [shuffledSongs, setShuffledSongs] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') ?? 'dark';
  });

  useEffect(() => {
    importFromUrl();
  }, [importFromUrl]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    localStorage.setItem('lastSongId', song.id);
    localStorage.removeItem('currentTime');
  };

  const handleLike = (id) => {
    setSongsState((prev) =>
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
      const arr = [...songsState].filter((s) => s.id !== selectedSong.id);
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setShuffledSongs([selectedSong, ...arr]);
    }
    setShuffle((prev) => !prev);
  };

  const handleNext = () => {
    const list = shuffle ? shuffledSongs : songsState;
    const currentIndex = list.findIndex((s) => s.id === selectedSong.id);
    if (currentIndex === list.length - 1) {
      if (shuffle) {
        const arr = [...songsState];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setShuffledSongs(arr);
        setSelectedSong(arr[0]);
      } else {
        setSelectedSong(songsState[0]);
      }
    } else {
      setSelectedSong(list[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const list = shuffle ? shuffledSongs : songsState;
    const currentIndex = list.findIndex((s) => s.id === selectedSong.id);
    if (currentIndex === 0) {
      setSelectedSong(list[list.length - 1]);
    } else {
      setSelectedSong(list[currentIndex - 1]);
    }
  };

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
        onNavigate={navigate}
      />
      <Outlet
        context={{
          songs: songsState,
          selectedSong,
          setSelectedSong: handleSelectSong,
          isPlaying,
          theme,
          setTheme,
        }}
      />
      <Sidebar />
    </div>
  );
}
