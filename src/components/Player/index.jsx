import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import style from './style.module.css';
import { animate } from 'animejs';

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
  const [volume, setVolume] = useState(() => {
    return parseFloat(localStorage.getItem('volume') ?? '1');
  });
  const [prevVolume, setPrevVolume] = useState(1);
  const audioRef = useRef(null);
  const coverRef = useRef(null);
  const titleRef = useRef(null);
  const titleInnerRef = useRef(null);
  const playBtnRef = useRef(null);
  const pulseAnim = useRef(null);
  const scrollAnim = useRef(null);

  useEffect(() => {
    if (!coverRef.current) return;

    animate(coverRef.current, {
      opacity: [0, 1],
      scale: [0.92, 1],
      duration: 400,
      easing: 'easeOutCubic',
    });
  }, [cover]);

  useEffect(() => {
    if (!playBtnRef.current) return;

    if (pulseAnim.current) {
      pulseAnim.current.pause();
      pulseAnim.current = null;
      animate(playBtnRef.current, { scale: 1, duration: 150 });
    }

    if (isPlaying) {
      pulseAnim.current = animate(playBtnRef.current, {
        scale: [1, 1.15, 1],
        duration: 900,
        easing: 'easeInOutSine',
        loop: true,
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!titleRef.current || !titleInnerRef.current) return;

    if (scrollAnim.current) {
      scrollAnim.current.pause();
      scrollAnim.current = null;
    }

    titleInnerRef.current.style.transform = 'translateX(0px)';

    const containerWidth = titleRef.current.offsetWidth;
    const textWidth = titleInnerRef.current.scrollWidth;
    const overflow = textWidth - containerWidth;

    if (overflow > 0) {
      const timeout = setTimeout(() => {
        scrollAnim.current = animate(titleInnerRef.current, {
          translateX: [0, -overflow - 20],
          duration: overflow * 35,
          easing: 'linear',
          loop: true,
          loopDelay: 1200,
          delay: 800,
        });
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [songName]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioRef.current.volume = val;
    localStorage.setItem('volume', val);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
      audioRef.current.volume = 0;
    } else {
      setVolume(prevVolume);
      audioRef.current.volume = prevVolume;
    }
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className={style.player}>
      <div className={style.player_img} ref={coverRef}>
        <img src={cover} alt='Album cover' />
      </div>
      <div className={style.title} ref={titleRef}>
        <h1 className={style.title_h1} ref={titleInnerRef}>
          {songName}
        </h1>
      </div>
      <h3>{artistName}</h3>
      <audio
        ref={audioRef}
        src={audioUrl}
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => {
          setCurrentTime(e.target.currentTime);
          if (Math.floor(e.target.currentTime) % 5 === 0) {
            localStorage.setItem('currentTime', e.target.currentTime);
          }
        }}
        onLoadedMetadata={(e) => {
          setDuration(e.target.duration);
          const saved = parseFloat(localStorage.getItem('currentTime') ?? '0');
          audioRef.current.currentTime = saved;
        }}
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
        <button ref={playBtnRef} onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={onNext}>
          <SkipForward />
        </button>
      </div>
      <div className={style.volume}>
        <button className={style.volume_btn} onClick={toggleMute}>
          <VolumeIcon size={18} />
        </button>
        <input
          type='range'
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className={style.volume_slider}
        />
      </div>
    </div>
  );
}
