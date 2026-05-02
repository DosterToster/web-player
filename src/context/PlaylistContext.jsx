import { createContext, useContext, useState } from 'react';

export const PlaylistContext = createContext(null);

export function usePlaylists() {
  return useContext(PlaylistContext);
}

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState(() => {
    return JSON.parse(localStorage.getItem('playlists') ?? '[]');
  });

  const savePlaylists = (updated) => {
    setPlaylists(updated);
    localStorage.setItem('playlists', JSON.stringify(updated));
  };

  const createPlaylist = (name) => {
    const newPlaylist = { id: Date.now(), name, songs: [] };
    savePlaylists([...playlists, newPlaylist]);
  };

  const deletePlaylist = (id) => {
    savePlaylists(playlists.filter((p) => p.id !== id));
  };

  const renamePlaylist = (id, name) => {
    savePlaylists(playlists.map((p) => (p.id === id ? { ...p, name } : p)));
  };

  const addSongToPlaylist = (playlistId, song) => {
    savePlaylists(
      playlists.map((p) => {
        if (p.id !== playlistId) return p;
        if (p.songs.find((s) => s.id === song.id)) return p;
        return { ...p, songs: [...p.songs, song] };
      })
    );
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    savePlaylists(
      playlists.map((p) =>
        p.id === playlistId
          ? { ...p, songs: p.songs.filter((s) => s.id !== songId) }
          : p
      )
    );
  };

  const sharePlaylist = (playlist) => {
    const encoded = btoa(
      unescape(encodeURIComponent(JSON.stringify(playlist)))
    );
    const url = `${window.location.origin}?playlist=${encoded}`;
    navigator.clipboard.writeText(url);
    alert('Посилання скопійовано!');
  };

  const importFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('playlist');
    if (!encoded) return;
    try {
      const playlist = JSON.parse(decodeURIComponent(escape(atob(encoded))));
      const exists = playlists.find((p) => p.id === playlist.id);
      if (!exists) {
        savePlaylists([...playlists, playlist]);
        alert(`Плейлист "${playlist.name}" імпортовано!`);
      }
      window.history.replaceState({}, '', window.location.pathname);
    } catch {
      console.error('Невірний формат плейлиста');
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createPlaylist,
        deletePlaylist,
        renamePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        sharePlaylist,
        importFromUrl,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
