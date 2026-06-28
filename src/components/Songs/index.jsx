import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import style from './style.module.css';

export default function Songs() {
  const { songs, selectedSong, setSelectedSong, isPlaying } =
    useOutletContext();
  const [search, setSearch] = useState('');

  const filteredSongs = songs.filter((song) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );
  });

  return (
    <div className={style.songs}>
      <div className={style.top_row}>
        <h2>Songs</h2>
        <div className={style.search_box}>
          <input
            type='search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Пошук пісень або виконавців'
            className={style.search_input}
          />
        </div>
      </div>
      <div className={style.header}>
        <span />
        <span>Title</span>
        <span>Artist</span>
        <span>Duration</span>
      </div>
      <ul className={style.list}>
        {filteredSongs.map((song) => (
          <li
            key={song.id}
            onClick={() => setSelectedSong(song)}
            className={song.id === selectedSong?.id ? style.active : ''}
          >
            <div className={style.cover}>
              <img src={song.cover} alt={song.title} />
              {song.id === selectedSong?.id && (
                <div
                  className={`${style.bars} ${!isPlaying ? style.paused : ''}`}
                >
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
            <span className={style.title}>{song.title}</span>
            <span className={style.artist}>{song.artist}</span>
            <span className={style.duration}>{song.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
