import style from './style.module.css';

export default function Playlist({
  songs,
  setSelectedSong,
  selectedSong,
  isPlaying,
}) {
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
              {song.id === selectedSong?.id && (
                <span
                  className={`${style.bars} ${!isPlaying ? style.paused : ''}`}
                >
                  <span />
                  <span />
                  <span />
                </span>
              )}
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
