import style from './style.module.css';

export default function Artists({ songs, selectedSong, isPlaying }) {
  const artists = [...new Set(songs.map((s) => s.artist))];

  return (
    <div className={style.artists}>
      <h2>Artists</h2>
      <ul className={style.list}>
        {artists.map((artist) => {
          const artistSongs = songs.filter((s) => s.artist === artist);
          const isActive = artistSongs.some((s) => s.id === selectedSong?.id);
          return (
            <li key={artist} className={isActive ? style.active : ''}>
              <div className={style.cover}>
                <img src={artistSongs[0].cover} alt={artist} />
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
                <span className={style.name}>{artist}</span>
                <span className={style.count}>{artistSongs.length} пісень</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
