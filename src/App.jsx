import './App.css'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Playlist from './components/Playlist'
import { useState } from 'react'

const songs = [
  {
    id: 1,
    title: 'Spiders',
    artist: 'Ashbury Heights',
    duration: '5:24',
    cover: '/завантаження (2).jpeg',
    audioUrl: '/Ashbury Heights - Spiders.mp3'
  },
  {
    id: 2,
    title: 'Born Slippy (Nuxx)',
    artist: 'Underworld',
    duration: '4:24',
    cover: '/завантаження.jpeg',
    audioUrl: '/Underworld - Born Slippy (Nuxx).mp3'
  },
  {
    id: 3,
    title: 'Dancing in the Factory',
    artist: 'And One',
    duration: '3:14',
    cover: '/завантаження (1).png',
    audioUrl: '/And One - Dancing in the Factory.mp3'
  },
  {
    id: 4,
    title: 'Traumfrau',
    artist: 'And One',
    duration: '5:24',
    cover: '/завантаження.png',
    audioUrl: '/And One - Traumfrau.mp3'
  },
  {
    id: 5,
    title: 'Eternity at an End',
    artist: 'Ashbury Heights',
    duration: '4:22',
    cover: '/завантаження (1).jpeg',
    audioUrl: '/Ashbury Heights - Eternity at an End.mp3'
  }
]

function App() {
  const [selectedSong, setSelectedSong] = useState(songs[0])

  const handleNext = () => {
    const currentIndex = songs.indexOf(selectedSong)

    if (currentIndex === songs.length - 1) {
      setSelectedSong(songs[0])
    } else {
      setSelectedSong(songs[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const currentIndex = songs.indexOf(selectedSong)

    if (currentIndex === 0) {
      setSelectedSong(songs[songs.length - 1])
    } else {
      setSelectedSong(songs[currentIndex - 1])
    }
  }

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