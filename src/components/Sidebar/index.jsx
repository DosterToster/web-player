import {
  Disc,
  Heart,
  Library,
  ListMusic,
  Mic2,
  Music,
  Settings,
} from 'lucide-react';
import style from './style.module.css';

const pages = [
  { id: 'playlists', Icon: Library, label: 'Playlists' },
  { id: 'playlist', Icon: ListMusic, label: 'Playlist' },
  { id: 'artists', Icon: Mic2, label: 'Artists' },
  { id: 'albums', Icon: Disc, label: 'Albums' },
  { id: 'songs', Icon: Music, label: 'Songs' },
  { id: 'favorites', Icon: Heart, label: 'Favorites' },
  { id: 'settings', Icon: Settings, label: 'Settings' },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <div className='menu'>
      <ul>
        {pages.map((page) => (
          <li
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className={activePage === page.id ? style.active : ''}
          >
            <page.Icon size={18} />
            {page.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
