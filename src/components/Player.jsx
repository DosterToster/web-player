import { SkipBack, Play, SkipForward } from "lucide-react"

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
                <button><SkipBack /></button>
                <button><Play /></button>
                <button><SkipForward /></button>
            </div>
        </div>
    )
}