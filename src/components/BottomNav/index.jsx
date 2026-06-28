import { useNavigate, useLocation } from 'react-router-dom';
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
  { path: '/', Icon: ListMusic, label: 'Songs' },
  { path: '/favorites', Icon: Heart, label: 'Favorites' },
  { path: '/playlists', Icon: Library, label: 'Playlists' },
  { path: '/settings', Icon: Settings, label: 'Settings' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={style.bottom_nav}>
      {pages.map((page) => (
        <button
          key={page.path}
          className={`${style.nav_btn} ${location.pathname === page.path ? style.active : ''}`}
          onClick={() => navigate(page.path)}
        >
          <page.Icon size={22} />
          <span>{page.label}</span>
        </button>
      ))}
    </nav>
  );
}
