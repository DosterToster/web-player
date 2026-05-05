import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.jsx';
import { PlaylistProvider } from './context/PlaylistContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlaylistProvider>
      <RouterProvider router={router} />
    </PlaylistProvider>
  </StrictMode>
);
