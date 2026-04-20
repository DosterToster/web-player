export default function Playlist() {
  const songs = [
    { id: 1, title: "K.", artist: "Cigarettes After Sex", duration: "5:20" },
    { id: 2, title: "Smile", artist: "Ashbury Heights", duration: "3:44" },
    { id: 3, title: "Goth", artist: "Sidewalks and Skeletons", duration: "3:27" }
  ];

  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <div className="playlist-header">
        <span>Title</span>
        <span>Artist</span>
        <span>Duration</span>
      </div>
      
      <ul>      
        {songs.map((song) => (
          <li key={song.id}>
            <span>{song.title}</span>
            <span>{song.artist}</span>
            <span>{song.duration}</span>
          </li>
        ))}
        
      </ul>
    </div>
  );
}
