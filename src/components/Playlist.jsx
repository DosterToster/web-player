export default function Playlist({ songs, setSelectedSong }) {
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
          <li key={song.id} onClick={() => setSelectedSong(song)}>
            <span>{song.title}</span>
            <span>{song.artist}</span>
            <span>{song.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
