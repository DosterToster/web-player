export default function Favorites({ songs, setSelectedSong }) {
  const favorites = songs.filter((s) => s.liked);

  return (
    <div className='playlist'>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p style={{ color: '#888' }}>No favorite songs</p>
      ) : (
        <ul>
          {favorites.map((song) => (
            <li key={song.id} onClick={() => setSelectedSong(song)}>
              <span>{song.title}</span>
              <span>{song.artist}</span>
              <span>{song.duration}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
