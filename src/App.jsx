import './App.css'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Playlist from './components/Playlist'
import { useState } from 'react'

function App() {
    const songs = [
    { id: 1, title: "K.", artist: "Cigarettes After Sex", duration: "5:20" },
    { id: 2, title: "Smile", artist: "Ashbury Heights", duration: "3:44" },
    { id: 3, title: "Goth", artist: "Sidewalks and Skeletons", duration: "3:27" }
  ];
  const [selectedSong, setSelectedSong] = useState(songs[0]);
  return (
    <div className="container app">
      <Player songName={selectedSong.title} artistName={selectedSong.artist} />
      <Playlist songs={songs} setSelectedSong={setSelectedSong} />
      <Sidebar />
    </div>
  )
}

export default App