const songs = [
  {
    id: 1,
    title: 'Spiders',
    artist: 'Ashbury Heights',
    duration: '5:24',
    cover: '/завантаження (2).jpeg',
    audioUrl: '/Ashbury Heights - Spiders.mp3',
  },
  {
    id: 2,
    title: 'Born Slippy (Nuxx)',
    artist: 'Underworld',
    duration: '4:24',
    cover: '/завантаження.jpeg',
    audioUrl: '/Underworld - Born Slippy (Nuxx).mp3',
  },
  {
    id: 3,
    title:
      'Dancing in the Factoryaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    artist: 'And One',
    duration: '3:14',
    cover: '/завантаження (1).png',
    audioUrl: '/And One - Dancing in the Factory.mp3',
  },
  {
    id: 4,
    title: 'Traumfrau',
    artist: 'And One',
    duration: '5:24',
    cover: '/завантаження.png',
    audioUrl: '/And One - Traumfrau.mp3',
  },
  {
    id: 5,
    title: 'Eternity at an End',
    artist: 'Ashbury Heights',
    duration: '4:22',
    cover: '/завантаження (1).jpeg',
    audioUrl: '/Ashbury Heights - Eternity at an End.mp3',
  },
];

export function getSongs() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(songs), 300);
  });
}
