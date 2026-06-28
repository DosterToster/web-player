import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Player from '../Player/index.jsx';
import Sidebar from '../Sidebar/index.jsx';
import MiniPlayer from '../MiniPlayer/index.jsx';
import BottomNav from '../BottomNav/index.jsx';
import { usePlaylists } from '../../context/PlaylistContext.jsx';
import style from './style.module.css';

export default function Layout() {
  const { songs } = useLoaderData();
  const navigate = useNavigate();
  const { importFromUrl } = usePlaylists();
  const [showFullPlayer, setShowFullPlayer] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 768
  );

  const [songsState, setSongsState] = useState(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedIds') ?? '[]');
    const data = Array.isArray(songs) ? songs : [];
    return data.map((s) => ({ ...s, liked: savedLikes.includes(s.id) }));
  });

  const [selectedSong, setSelectedSong] = useState(() => {
    const lastId = localStorage.getItem('lastSongId');
    const last = songsState.find((s) => s.id === Number(lastId));
    return last ?? songsState[0] ?? null;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [shuffledSongs, setShuffledSongs] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') ?? 'dark';
  });

  useEffect(() => {
    importFromUrl();
  }, [importFromUrl]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const parseFileName = (name) => {
    const fileName = name.replace(/\.[^/.]+$/, '');
    const [artist, title] = fileName.split(' - ');
    return {
      title: title?.trim() || fileName,
      artist: artist?.trim() || 'Unknown Artist',
    };
  };

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  const getAudioDuration = (src) =>
    new Promise((resolve) => {
      const audio = new Audio(src);
      audio.preload = 'metadata';
      audio.addEventListener('loadedmetadata', () => {
        resolve(formatDuration(audio.duration));
      });
      audio.addEventListener('error', () => {
        resolve('0:00');
      });
      audio.src = src;
    });

  const handleUploadSongs = async (files) => {
    const uploaded = await Promise.all(
      Array.from(files).map(async (file) => {
        const audioUrl = URL.createObjectURL(file);
        const { title, artist } = parseFileName(file.name);
        const duration = await getAudioDuration(audioUrl);
        return {
          id: Date.now() + Math.random(),
          title,
          artist,
          duration,
          cover: '/завантаження.png',
          audioUrl,
          liked: false,
          source: 'upload',
        };
      })
    );

    setSongsState((prev) => [...prev, ...uploaded]);
    if (uploaded.length > 0) {
      setSelectedSong(uploaded[0]);
    }
  };

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    localStorage.setItem('lastSongId', song.id);
    localStorage.removeItem('currentTime');
  };

  const handleLike = (id) => {
    setSongsState((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const updated = { ...s, liked: !s.liked };
          setSelectedSong(updated);
          const savedLikes = JSON.parse(
            localStorage.getItem('likedIds') ?? '[]'
          );
          const newLikes = updated.liked
            ? [...savedLikes, id]
            : savedLikes.filter((likedId) => likedId !== id);
          localStorage.setItem('likedIds', JSON.stringify(newLikes));
          return updated;
        }
        return s;
      })
    );
  };

  const handleShuffle = () => {
    if (!shuffle) {
      const arr = [...songsState].filter((s) => s.id !== selectedSong.id);
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setShuffledSongs([selectedSong, ...arr]);
    }
    setShuffle((prev) => !prev);
  };

  const handleNext = () => {
    const list = shuffle ? shuffledSongs : songsState;
    const currentIndex = list.findIndex((s) => s.id === selectedSong.id);
    if (currentIndex === list.length - 1) {
      if (shuffle) {
        const arr = [...songsState];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setShuffledSongs(arr);
        setSelectedSong(arr[0]);
      } else {
        setSelectedSong(songsState[0]);
      }
    } else {
      setSelectedSong(list[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const list = shuffle ? shuffledSongs : songsState;
    const currentIndex = list.findIndex((s) => s.id === selectedSong.id);
    if (currentIndex === 0) {
      setSelectedSong(list[list.length - 1]);
    } else {
      setSelectedSong(list[currentIndex - 1]);
    }
  };

  if (!selectedSong) return <div>Завантаження...</div>;

  const playerProps = {
    songName: selectedSong.title,
    artistName: selectedSong.artist,
    cover: selectedSong.cover,
    audioUrl: selectedSong.audioUrl,
    liked: selectedSong.liked,
    onNext: handleNext,
    onPrev: handlePrevious,
    onLike: () => handleLike(selectedSong.id),
    repeat,
    shuffle,
    onRepeat: () => setRepeat((prev) => !prev),
    onShuffle: handleShuffle,
    isPlaying,
    onPlayingChange: setIsPlaying,
    onNavigate: navigate,
  };

  return (
    <div className='container app'>
      {/* Десктоп плеєр */}
      <div className={style.desktop_player}>
        <Player {...playerProps} />
      </div>

      {/* Мобільний повний плеєр */}
      {showFullPlayer && (
        <div className={style.mobile_player}>
          <button
            className={style.close_btn}
            onClick={() => setShowFullPlayer(false)}
          >
            ✕
          </button>
          <Player {...playerProps} />
        </div>
      )}

      <div className={style.content}>
        <Outlet
          context={{
            songs: songsState,
            selectedSong,
            setSelectedSong: handleSelectSong,
            onUploadSongs: handleUploadSongs,
            isPlaying,
            theme,
            setTheme,
          }}
        />
      </div>

      <Sidebar />

      {/* Мобільний міні-плеєр і навігація */}
      <div className={style.mobile_bottom}>
        <MiniPlayer
          song={selectedSong}
          isPlaying={isPlaying}
          onPlayPause={() => {}}
          onNext={handleNext}
          onClick={() => setShowFullPlayer(true)}
        />
        <BottomNav />
      </div>
    </div>
  );
}
