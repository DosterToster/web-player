import './App.css';
import Sidebar from './components/Sidebar/index.jsx';
import Player from './components/Player/index.jsx';
import Playlist from './components/Playlist/index.jsx';
import { useState, useEffect } from 'react';
import { getSongs } from './api/songs.js';

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    getSongs().then((data) => {
      setSongs(data);
      const lastId = localStorage.getItem('lastSongId');
      const last = data.find((s) => s.id === Number(lastId));
      setSelectedSong(last ?? data[0]);
    });
  }, []);

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    localStorage.setItem('lastSongId', song.id);
    localStorage.removeItem('currentTime');
  };
  const handleNext = () => {
    const currentIndex = songs.indexOf(selectedSong);
    if (currentIndex === songs.length - 1) {
      setSelectedSong(songs[0]);
    } else {
      setSelectedSong(songs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = songs.indexOf(selectedSong);
    if (currentIndex === 0) {
      setSelectedSong(songs[songs.length - 1]);
    } else {
      setSelectedSong(songs[currentIndex - 1]);
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
        onNext={handleNext}
        onPrev={handlePrevious}
      />
      <Playlist songs={songs} setSelectedSong={handleSelectSong} />
      <Sidebar />
    </div>
  );
}

export default App;
