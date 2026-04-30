import style from './style.module.css';

export default function Songs({
  songs,
  setSelectedSong,
  selectedSong,
  isPlaying,
}) {
  return (
    <div className={style.songs}>
      <h2>Songs</h2>
      <div className={style.header}>
        <span />
        <span>Title</span>
        <span>Artist</span>
        <span>Duration</span>
      </div>
      <ul className={style.list}>
        {songs.map((song) => (
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
    </div>
  );
}
