import {
  Disc,
  Download,
  Heart,
  Library,
  ListMusic,
  Mic2,
  Music,
  Settings,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './style.module.css';

const pages = [
  { path: '/', Icon: ListMusic, label: 'Songs' },
  { path: '/download', Icon: Download, label: 'Download' },
  { path: '/playlists', Icon: Library, label: 'Playlists' },
  { path: '/favorites', Icon: Heart, label: 'Favorites' },
  { path: '/settings', Icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='menu'>
      <ul>
        {pages.map((page) => (
          <li
            key={page.path}
            onClick={() => navigate(page.path)}
            className={location.pathname === page.path ? style.active : ''}
          >
            <page.Icon size={18} />
            {page.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
