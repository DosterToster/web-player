import style from './style.module.css';

export default function Favorites({
  songs,
  setSelectedSong,
  selectedSong,
  isPlaying,
}) {
  const favorites = songs.filter((s) => s.liked);

  return (
    <div className={style.favorites}>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p className={style.empty}>Немає вподобаних пісень ❤️</p>
      ) : (
        <>
          <div className={style.header}>
            <span />
            <span>Title</span>
            <span>Artist</span>
            <span>Duration</span>
          </div>
          <ul className={style.list}>
            {favorites.map((song) => (
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
                <span className={style.title}>{song.title}</span>
                <span className={style.artist}>{song.artist}</span>
                <span className={style.duration}>{song.duration}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
