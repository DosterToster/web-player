import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import style from './style.module.css';

export default function ArtistPage() {
  const { artistName } = useParams();
  const { songs, selectedSong, setSelectedSong, isPlaying } =
    useOutletContext();
  const navigate = useNavigate();

  const artistSongs = songs.filter(
    (s) => s.artist === decodeURIComponent(artistName)
  );

  return (
    <div className={style.page}>
      <button className={style.back_btn} onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        Назад
      </button>
      <div className={style.header}>
        {artistSongs[0] && (
          <img
            src={artistSongs[0].cover}
            alt={artistName}
            className={style.avatar}
          />
        )}
        <h2>{decodeURIComponent(artistName)}</h2>
        <span className={style.count}>{artistSongs.length} пісень</span>
      </div>
      <ul className={style.list}>
        {artistSongs.map((song) => (
          <li
            key={song.id}
            onClick={() => setSelectedSong(song)}
            className={song.id === selectedSong?.id ? style.active : ''}
          >
            <div className={style.cover}>
              <img src={song.cover} alt={song.title} />
              {song.id === selectedSong?.id && (
                <div
                  className={`${style.bars} ${!isPlaying ? style.paused : ''}`}
                >
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
            <div className={style.info}>
              <span className={style.title}>{song.title}</span>
              <span className={style.duration}>{song.duration}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
