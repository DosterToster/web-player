import { SkipBack, Play, Pause, SkipForward } from "lucide-react"
import { useState, useRef } from "react"

export default function Player({ songName, artistName, cover, audioUrl, onNext, onPrev })
{const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
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
            <audio ref={audioRef}
                src={audioUrl}
                autoPlay onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.target.duration)}>
            </audio>
            <div className="progress-bar">
                <span>
                    {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
                </span>
  
                <input 
                type="range" 
                min={0} 
                max={duration} 
                value={currentTime} 
                onChange={(e) => {
                audioRef.current.currentTime = e.target.value
                setCurrentTime(e.target.value)
                }} 
            />

                <span>
                    {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
                </span>
                </div>
            <div className="controls">
                <button onClick={onPrev}><SkipBack /></button>
                <button onClick={togglePlayPause}>{isPlaying ? <Pause /> : <Play />}</button>
                <button onClick={onNext}><SkipForward /></button>
            </div>
        </div>
    )
}