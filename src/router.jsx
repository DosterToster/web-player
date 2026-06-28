import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/index.jsx';
import Songs from './components/Songs/index.jsx';
import Favorites from './components/Favorites/index.jsx';
import Playlists from './components/Playlists/index.jsx';
import Settings from './components/Settings/index.jsx';
import Download from './components/Download/index.jsx';
import { getSongs } from './api/songs.js';
import ArtistPage from './components/ArtistPage/index.jsx';

const songsLoader = async () => {
  const songs = await getSongs();
  return { songs };
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: songsLoader,
    children: [
      { index: true, element: <Songs /> },
      { path: 'download', element: <Download /> },
      { path: 'favorites', element: <Favorites /> },
      { path: 'playlists', element: <Playlists /> },
      { path: 'settings', element: <Settings /> },
      { path: 'artist/:artistName', element: <ArtistPage /> },
    ],
  },
]);
