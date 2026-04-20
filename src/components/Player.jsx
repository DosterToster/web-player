import { SkipBack, Play, SkipForward } from "lucide-react"

export default function Player({ songName, artistName }) {
    return (
        <div className="player">
            <img src="Ena bbq.jpeg" alt="Album cover" /> 
            <h1>{songName}</h1>
            <h3>{artistName}</h3>
            <div className="progress-bar">
                <span>0:00</span>
                <input type="range" />
                <span>0:00</span>   
            </div>
            <div className="controls">
                <button><SkipBack /></button>
                <button><Play /></button>
                <button><SkipForward /></button>
            </div>
        </div>
    )
}