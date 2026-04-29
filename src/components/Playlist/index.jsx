import style from './style.module.css';

export default function Playlist({ songs, setSelectedSong, selectedSong }) {
  return (
    <div className='playlist'>
      <h2>Playlist</h2>
      <div className='playlist-header'>
        <span>Title</span>
        <span>Artist</span>
        <span>Duration</span>
      </div>
      <ul>
        {songs.map((song) => (
          <li
            key={song.id}
            onClick={() => setSelectedSong(song)}
            className={song.id === selectedSong?.id ? style.active : ''}
          >
            <span className={style.song_title}>
              {song.id === selectedSong?.id ? (
                <span className={style.bars}>
                  <span />
                  <span />
                  <span />
                </span>
              ) : null}
              {song.title}
            </span>
            <span className={style.song_artist}>{song.artist}</span>
            <span>{song.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
