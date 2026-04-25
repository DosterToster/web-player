import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import style from './style.module.css';
import { animate, createScope } from 'animejs';

export default function Player({
  songName,
  artistName,
  cover,
  audioUrl,
  onNext,
  onPrev,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
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
    <div className={style.player}>
      <div className={style.player_img}>
        <img src={cover} alt='Album cover' />
      </div>
      <div className={style.title}>
        <h1 className={style.title_h1}>{songName}</h1>
      </div>
      <h3>{artistName}</h3>
      <audio
        ref={audioRef}
        src={audioUrl}
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      />
      <div className={style.progress_bar}>
        <span>
          {Math.floor(currentTime / 60)}:
          {String(Math.floor(currentTime % 60)).padStart(2, '0')}
        </span>

        <input
          type='range'
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
            setCurrentTime(e.target.value);
          }}
        />

        <span>
          {Math.floor(duration / 60)}:
          {String(Math.floor(duration % 60)).padStart(2, '0')}
        </span>
      </div>
      <div className='controls'>
        <button onClick={onPrev}>
          <SkipBack />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={onNext}>
          <SkipForward />
        </button>
      </div>
    </div>
  );
}
