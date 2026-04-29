export default function Artists({ songs }) {
  const artists = [...new Set(songs.map((s) => s.artist))];

  return (
    <div className='playlist'>
      <h2>Artists</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist}>
            <span>{artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
