export default function Player() {
    return (
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
    )
}