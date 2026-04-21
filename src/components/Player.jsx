import { SkipBack, Play, Pause, SkipForward } from "lucide-react"
import { useState, useRef } from "react"

export default function Player({ songName, artistName, cover, audioUrl, onNext, onPrev })
{const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    return (
        <div className="player">
            <img src={cover} alt="Album cover" /> 
            <h1>{songName}</h1>
            <h3>{artistName}</h3>
            <audio ref={audioRef} src={audioUrl} autoPlay onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}></audio>
            <div className="progress-bar">
                <span>0:00</span>
                <input type="range" />
                <span>0:00</span>   
            </div>
            <div className="controls">
                <button onClick={onPrev}><SkipBack /></button>
                <button onClick={togglePlayPause}>{isPlaying ? <Pause /> : <Play />}</button>
                <button onClick={onNext}><SkipForward /></button>
            </div>
        </div>
    )
}