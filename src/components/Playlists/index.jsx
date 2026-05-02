import { useState } from 'react';
import { usePlaylists } from '../../context/PlaylistContext.jsx';
import { Plus, Share2, Trash2, Pencil, Check, X } from 'lucide-react';
import style from './style.module.css';

export default function Playlists({ songs, setSelectedSong, selectedSong }) {
  const {
    playlists,
    createPlaylist,
    deletePlaylist,
    renamePlaylist,
    sharePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
  } = usePlaylists();

  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [openPlaylistId, setOpenPlaylistId] = useState(null);

  const handleCreate = () => {
    if (!newName.trim()) return;
    createPlaylist(newName.trim());
    setNewName('');
  };

  const handleRename = (id) => {
    if (!editingName.trim()) return;
    renamePlaylist(id, editingName.trim());
    setEditingId(null);
  };

  return (
    <div className={style.playlists}>
      <h2>Playlists</h2>
      <div className={style.create}>
        <input
          type='text'
          placeholder='Назва плейлиста...'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          className={style.input}
        />
        <button onClick={handleCreate} className={style.create_btn}>
          <Plus size={18} />
        </button>
      </div>

      <ul className={style.list}>
        {playlists.map((playlist) => (
          <li key={playlist.id} className={style.playlist_item}>
            <div className={style.playlist_header}>
              {editingId === playlist.id ? (
                <div className={style.edit_row}>
                  <input
                    className={style.input}
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleRename(playlist.id)
                    }
                    autoFocus
                  />
                  <button
                    onClick={() => handleRename(playlist.id)}
                    className={style.icon_btn}
                  >
                    <Check size={16} color='#1db954' />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className={style.icon_btn}
                  >
                    <X size={16} color='#888' />
                  </button>
                </div>
              ) : (
                <div className={style.name_row}>
                  <span
                    className={style.playlist_name}
                    onClick={() =>
                      setOpenPlaylistId(
                        openPlaylistId === playlist.id ? null : playlist.id
                      )
                    }
                  >
                    {playlist.name}
                    <span className={style.count}>
                      {playlist.songs.length} пісень
                    </span>
                  </span>
                  <div className={style.actions}>
                    <button
                      className={style.icon_btn}
                      onClick={() => {
                        setEditingId(playlist.id);
                        setEditingName(playlist.name);
                      }}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      className={style.icon_btn}
                      onClick={() => sharePlaylist(playlist)}
                    >
                      <Share2 size={15} />
                    </button>
                    <button
                      className={style.icon_btn}
                      onClick={() => deletePlaylist(playlist.id)}
                    >
                      <Trash2 size={15} color='#e05' />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {openPlaylistId === playlist.id && (
              <div className={style.songs}>
                {playlist.songs.length === 0 ? (
                  <p className={style.empty}>Немає пісень</p>
                ) : (
                  <ul className={style.song_list}>
                    {playlist.songs.map((song) => (
                      <li
                        key={song.id}
                        className={`${style.song_item} ${song.id === selectedSong?.id ? style.active : ''}`}
                        onClick={() => setSelectedSong(song)}
                      >
                        <img
                          src={song.cover}
                          alt={song.title}
                          className={style.cover}
                        />
                        <div className={style.song_info}>
                          <span className={style.song_title}>{song.title}</span>
                          <span className={style.song_artist}>
                            {song.artist}
                          </span>
                        </div>
                        <button
                          className={style.icon_btn}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSongFromPlaylist(playlist.id, song.id);
                          }}
                        >
                          <X size={14} color='#888' />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className={style.add_songs}>
                  <p className={style.add_title}>Додати пісню:</p>
                  <ul className={style.song_list}>
                    {songs
                      .filter(
                        (s) => !playlist.songs.find((ps) => ps.id === s.id)
                      )
                      .map((song) => (
                        <li
                          key={song.id}
                          className={style.song_item}
                          onClick={() => addSongToPlaylist(playlist.id, song)}
                        >
                          <img
                            src={song.cover}
                            alt={song.title}
                            className={style.cover}
                          />
                          <div className={style.song_info}>
                            <span className={style.song_title}>
                              {song.title}
                            </span>
                            <span className={style.song_artist}>
                              {song.artist}
                            </span>
                          </div>
                          <Plus size={14} color='orange' />
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
