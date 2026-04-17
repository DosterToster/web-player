import './App.css'

function App() {
  return (
    <div className="container app">
      <div className="player">
        <img src="Ena bbq.jpeg" alt="Album cover" /> 
        <h1>Music Name</h1>
        <h3>Artist Name</h3>
        <div className="progress-bar">
          <span>0:00</span>
          <input type="range" />
          <span>0:00</span>   
        </div>
        <div className="controls">
          <button>⏮️</button>
          <button>⏯️</button>
          <button>⏭️</button>
        </div>
      </div>
      
      <div className="playlist">
        <h2>Playlist</h2>
        <div className="playlist-header">
          <span>Title</span>
          <span>Artist</span>
          <span>Duration</span>
        </div> 
        <ul>
          <li>
            <span>K.</span>
            <span>Cigarettes After Sex</span>
            <span>5:20</span>
          </li>
          <li>
            <span>Smile</span>
            <span>Ashbury Heights</span>
            <span>3:44</span>
          </li>
          <li>
            <span>Goth</span>
            <span>Sidewalks and Skeletons</span>
            <span>3:27</span>
          </li>
        </ul>
      </div>
      
      <div className="menu">
        <ul>
          <li>Playlist</li>
          <li>Artists</li>
          <li>Albums</li>
          <li>Songs</li>
          <li>Favourite</li>
          <li>Settings</li>
        </ul>
      </div>
    </div>
  )
}

export default App