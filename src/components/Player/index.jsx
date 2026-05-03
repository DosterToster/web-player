import {
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
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
  liked,
  onLike,
  repeat,
  shuffle,
  onRepeat,
  onShuffle,
  isPlaying,
  onPlayingChange,
  onNavigate,
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [volume, setVolume] = useState(() => {
    return parseFloat(localStorage.getItem('volume') ?? '1');
  });
  const [prevVolume, setPrevVolume] = useState(1);
  const audioRef = useRef(null);
  const coverRef = useRef(null);
  const titleInnerRef = useRef(null);
  const titleRef = useRef(null);
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

  useEffect(() => {
    if (!showMenu) return;
    const handler = () => setShowMenu(false);
    const timeout = setTimeout(() => {
      document.addEventListener('click', handler);
    }, 0);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', handler);
    };
  }, [showMenu]);

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
      <div className={style.cover_wrap} ref={coverRef}>
        <img src={cover} alt='Album cover' className={style.cover_img} />
      </div>

      <div className={style.meta}>
        <div className={style.text}>
          <div className={style.title} ref={titleRef}>
            <span className={style.title_inner} ref={titleInnerRef}>
              {songName}
            </span>
          </div>
          <div className={style.artist_wrap}>
            <span
              className={style.artist}
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu((prev) => !prev);
              }}
            >
              {artistName}
            </span>
            {showMenu && (
              <div className={style.menu}>
                <button
                  onClick={() => {
                    onNavigate('albums');
                    setShowMenu(false);
                  }}
                >
                  Перейти до альбому
                </button>
                <button
                  onClick={() => {
                    onNavigate('artists');
                    setShowMenu(false);
                  }}
                >
                  Перейти до виконавця
                </button>
              </div>
            )}
          </div>
        </div>
        <button onClick={onLike} className={style.like_btn}>
          <Heart
            size={22}
            fill={liked ? 'orange' : 'none'}
            color={liked ? 'orange' : 'white'}
          />
        </button>
      </div>

      <div className={style.progress_bar}>
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
        <div className={style.times}>
          <span>
            {Math.floor(currentTime / 60)}:
            {String(Math.floor(currentTime % 60)).padStart(2, '0')}
          </span>
          <span>
            -{Math.floor((duration - currentTime) / 60)}:
            {String(Math.floor((duration - currentTime) % 60)).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className={style.controls}>
        <button onClick={onShuffle} className={style.side_btn}>
          <Shuffle size={20} color={shuffle ? 'orange' : 'white'} />
        </button>
        <button onClick={onPrev} className={style.nav_btn}>
          <SkipBack size={28} />
        </button>
        <button
          ref={playBtnRef}
          onClick={togglePlayPause}
          className={style.play_btn}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button onClick={onNext} className={style.nav_btn}>
          <SkipForward size={28} />
        </button>
        <button onClick={onRepeat} className={style.side_btn}>
          <Repeat size={20} color={repeat ? 'orange' : 'white'} />
        </button>
      </div>

      <div className={style.volume}>
        <button className={style.volume_btn} onClick={toggleMute}>
          <VolumeIcon size={16} />
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

      <audio
        ref={audioRef}
        src={audioUrl}
        onPlay={() => onPlayingChange(true)}
        onPause={() => onPlayingChange(false)}
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
          if (isPlaying) {
            audioRef.current.play();
          }
        }}
        onEnded={() => {
          if (repeat) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            onNext();
          }
        }}
      />
    </div>
  );
}
