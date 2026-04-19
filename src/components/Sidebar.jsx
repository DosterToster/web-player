import { ListMusic, Mic2, Disc, Music, Heart, Settings }
from "lucide-react";

export default function Sidebar() {
  return (
    <div className="menu">
      <ul>
        <li><ListMusic /> Playlist</li>
        <li><Mic2 /> Artists</li>
        <li><Disc /> Albums</li>
        <li><Music /> Songs</li>
        <li><Heart /> Favourite</li>
        <li><Settings /> Settings</li>
      </ul>
    </div>
  )
}