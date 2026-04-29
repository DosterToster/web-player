export default function Albums({ songs }) {
  const albums = [...new Map(songs.map((s) => [s.artist, s])).values()];

  return (
    <div className='playlist'>
      <h2>Albums</h2>
      <ul>
        {albums.map((s) => (
          <li key={s.artist}>
            <img
              src={s.cover}
              alt={s.artist}
              width={40}
              height={40}
              style={{ borderRadius: 6, objectFit: 'cover' }}
            />
            <span>{s.artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
