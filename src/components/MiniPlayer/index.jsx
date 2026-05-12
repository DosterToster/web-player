import { Play, Pause, SkipForward } from 'lucide-react';
import style from './style.module.css';

export default function MiniPlayer({
  song,
  isPlaying,
  onPlayPause,
  onNext,
  onClick,
}) {
  return (
    <div className={style.mini_player} onClick={onClick}>
      <img src={song.cover} alt={song.title} className={style.cover} />
      <div className={style.info}>
        <span className={style.title}>{song.title}</span>
        <span className={style.artist}>{song.artist}</span>
      </div>
      <div className={style.controls}>
        <button
          className={style.btn}
          onClick={(e) => {
            e.stopPropagation();
            onPlayPause();
          }}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          className={style.btn}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
}
