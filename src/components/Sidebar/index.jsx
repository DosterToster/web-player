import { Disc, Heart, ListMusic, Mic2, Music, Settings } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="menu">
      <ul>
        <li><ListMusic /> Playlist</li>
        <li><Mic2 /> Artists</li>
        <li><Disc /> Albums</li>
        <li><Music /> Songs</li>
        <li><Heart /> Favorites</li>
        <li><Settings /> Settings</li>
      </ul>
    </div>
  )
}