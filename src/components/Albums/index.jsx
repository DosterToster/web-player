import { useOutletContext } from 'react-router-dom';
import style from './style.module.css';

export default function Albums() {
  const { songs, selectedSong, isPlaying } = useOutletContext();
  const albums = [...new Map(songs.map((s) => [s.artist, s])).values()];

  return (
    <div className={style.albums}>
      <h2>Albums</h2>
      <ul className={style.list}>
        {albums.map((album) => {
          const albumSongs = songs.filter((s) => s.artist === album.artist);
          const isActive = albumSongs.some((s) => s.id === selectedSong?.id);
          return (
            <li key={album.artist} className={isActive ? style.active : ''}>
              <div className={style.cover}>
                <img src={album.cover} alt={album.artist} />
                {isActive && (
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
                <span className={style.name}>{album.artist}</span>
                <span className={style.count}>{albumSongs.length} пісень</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
