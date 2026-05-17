import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import style from './style.module.css';

export default function AlbumPage() {
  const { albumName } = useParams();
  const { songs, selectedSong, setSelectedSong } = useOutletContext();
  const navigate = useNavigate();

  const album = decodeURIComponent(albumName);
  const albumSongs = songs.filter((s) => s.album === album);
  const albumCover = albumSongs[0]?.cover;
  const albumArtist = albumSongs[0]?.artist;

  return (
    <div className={style.page}>
      <button className={style.back_btn} onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        Назад
      </button>
      <div className={style.header}>
        {albumCover && (
          <img src={albumCover} alt={album} className={style.cover} />
        )}
        <div className={style.info}>
          <h2 className={style.title}>{album}</h2>
          <span className={style.artist}>{albumArtist}</span>
          <span className={style.count}>{albumSongs.length} пісень</span>
        </div>
      </div>
      <ul className={style.list}>
        {albumSongs.map((song, index) => (
          <li
            key={song.id}
            onClick={() => setSelectedSong(song)}
            className={song.id === selectedSong?.id ? style.active : ''}
          >
            <span className={style.index}>{index + 1}</span>
            <div className={style.song_info}>
              <span className={style.song_title}>{song.title}</span>
            </div>
            <span className={style.duration}>{song.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
