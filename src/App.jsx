import './App.css'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Playlist from './components/Playlist'
import { useState } from 'react'

const songs = [
  { 
    id: 1, 
    title: "K.", 
    artist: "Cigarettes After Sex", 
    duration: "5:20",
    cover: "/Ena bbq.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  { 
    id: 2, 
    title: "Smile", 
    artist: "Ashbury Heights", 
    duration: "3:44",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  { 
    id: 3, 
    title: "Goth", 
    artist: "Sidewalks and Skeletons", 
    duration: "3:27",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=300&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

function App() {
  const [selectedSong, setSelectedSong] = useState(songs[0]);

  const handleNext = () => {
    const currentIndex = songs.indexOf(selectedSong);

    if (currentIndex === 2) {
      setSelectedSong(songs[0]);
    } else {
      setSelectedSong(songs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = songs.indexOf(selectedSong);

    if (currentIndex === 0) {
      setSelectedSong(songs[2]);
    } else {
      setSelectedSong(songs[currentIndex - 1]);
    }
  };

  return (
    <div className="container app">
      <Player 
        songName={selectedSong.title} 
        artistName={selectedSong.artist} 
        cover={selectedSong.cover} 
        audioUrl={selectedSong.audioUrl}
        onNext={handleNext} 
        onPrev={handlePrevious} 
      />
      <Playlist 
        songs={songs}
        setSelectedSong={setSelectedSong}
      />
      <Sidebar />
    </div>
  )
}

export default App