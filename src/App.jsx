import './App.css'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Playlist from './components/Playlist'

function App() {
  return (
    <div className="container app">
      <Player />
      <Playlist />
      <Sidebar />
    </div>
  )
}

export default App