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
  const coverRef = useRef(null);
  const titleRef = useRef(null);
  const titleInnerRef = useRef(null);
  const playBtnRef = useRef(null);
  const pulseAnim = useRef(null);
  const scrollAnim = useRef(null);
  const scopeRef = useRef(null);

  // Анімація обкладинки при зміні треку
  useEffect(() => {
    if (!coverRef.current) return;

    animate(coverRef.current, {
      opacity: [0, 1],
      scale: [0.92, 1],
      duration: 400,
      easing: 'easeOutCubic',
    });
  }, [cover]);

  // Пульсація кнопки play/pause
  useEffect(() => {
    if (!playBtnRef.current) return;

    if (pulseAnim.current) {
      pulseAnim.current.pause();
      pulseAnim.current = null;
      // скидаємо transform
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

  // Скролінг назви якщо вона не вміщується
  useEffect(() => {
    if (!titleRef.current || !titleInnerRef.current) return;

    if (scrollAnim.current) {
      scrollAnim.current.pause();
      scrollAnim.current = null;
    }

    // скидаємо позицію
    titleInnerRef.current.style.transform = 'translateX(0px)';

    const containerWidth = titleRef.current.offsetWidth;
    const textWidth = titleInnerRef.current.scrollWidth;
    const overflow = textWidth - containerWidth;

    if (overflow > 0) {
      // затримка перед стартом скролу
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
        <button ref={playBtnRef} onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={onNext}>
          <SkipForward />
        </button>
      </div>
    </div>
  );
}
