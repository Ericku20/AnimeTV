/**
 * Mock API Service para desarrollo
 * Proporciona datos de ejemplo cuando la API real no está disponible
 */

interface MockAnime {
  id: string;
  title: string;
  image: string;
  url: string;
  year?: number;
  type?: string;
  status?: string;
  rating?: number;
  synopsis?: string;
}

interface MockEpisode {
  number: number;
  title: string;
  url: string;
  airDate?: string;
}

const mockAnimeList: MockAnime[] = [
  {
    id: '1',
    title: 'Naruto',
    image:
      'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
    url: 'https://anime1.com/anime/naruto',
    year: 2002,
    type: 'TV',
    status: 'Completed',
    rating: 8.5,
    synopsis:
      'Naruto Uzumaki is a young ninja who bears a great responsibility.',
  },
  {
    id: '2',
    title: 'One Piece',
    image:
      'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
    url: 'https://anime1.com/anime/one-piece',
    year: 1999,
    type: 'TV',
    status: 'Ongoing',
    rating: 8.9,
    synopsis:
      'As a child, Monkey D. Luffy was inspired to become a pirate.',
  },
  {
    id: '3',
    title: 'Death Note',
    image:
      'https://cdn.myanimelist.net/images/anime/5/6125.jpg',
    url: 'https://anime1.com/anime/death-note',
    year: 2006,
    type: 'TV',
    status: 'Completed',
    rating: 8.6,
    synopsis:
      'A notebook that grants the power to kill anyone whose name is written in it.',
  },
  {
    id: '4',
    title: 'Attack on Titan',
    image:
      'https://cdn.myanimelist.net/images/anime/10/46722.jpg',
    url: 'https://anime1.com/anime/attack-on-titan',
    year: 2013,
    type: 'TV',
    status: 'Completed',
    rating: 8.5,
    synopsis:
      'Humanity lives inside cities surrounded by tall walls that protect them from gigantic man-eating humanoids.',
  },
  {
    id: '5',
    title: 'My Hero Academia',
    image:
      'https://cdn.myanimelist.net/images/anime/10/75964.jpg',
    url: 'https://anime1.com/anime/my-hero-academia',
    year: 2016,
    type: 'TV',
    status: 'Ongoing',
    rating: 8.0,
    synopsis:
      'In a world where people with superpowers are the norm, a powerless boy enrolls in a prestigious academy.',
  },
  {
    id: '6',
    title: 'Demon Slayer',
    image:
      'https://cdn.myanimelist.net/images/anime/6/45960.jpg',
    url: 'https://anime1.com/anime/demon-slayer',
    year: 2019,
    type: 'TV',
    status: 'Ongoing',
    rating: 8.5,
    synopsis:
      'A young man whose family was slaughtered by demons joins a swordsman to fight and defeat the demons.',
  },
  {
    id: '7',
    title: 'Jujutsu Kaisen',
    image:
      'https://cdn.myanimelist.net/images/anime/5/85019.jpg',
    url: 'https://anime1.com/anime/jujutsu-kaisen',
    year: 2020,
    type: 'TV',
    status: 'Ongoing',
    rating: 8.7,
    synopsis:
      'A high schooler swallows a cursed talisman and joins a secret organization to fight cursed spirits.',
  },
  {
    id: '8',
    title: 'Steins;Gate',
    image:
      'https://cdn.myanimelist.net/images/anime/5/39911.jpg',
    url: 'https://anime1.com/anime/steinsgate',
    year: 2011,
    type: 'TV',
    status: 'Completed',
    rating: 9.1,
    synopsis:
      'A college student discovers that his microwave can send SMS to the past.',
  },
];

const mockEpisodes: MockEpisode[] = [
  { number: 1, title: 'Introducción', url: 'https://anime1.com/episode/1' },
  { number: 2, title: 'Primer Encuentro', url: 'https://anime1.com/episode/2' },
  { number: 3, title: 'Entrenamiento', url: 'https://anime1.com/episode/3' },
  { number: 4, title: 'Batalla', url: 'https://anime1.com/episode/4' },
  { number: 5, title: 'Revelación', url: 'https://anime1.com/episode/5' },
];

export const mockApiService = {
  /**
   * Mock search
   */
  searchAnime: async (query: string, page: number = 1) => {
    console.log(`[MOCK] Searching: ${query} (page ${page})`);
    
    // Filter anime based on query
    const filtered = mockAnimeList.filter((a) =>
      a.title.toLowerCase().includes(query.toLowerCase())
    );

    return {
      results: filtered.slice((page - 1) * 10, page * 10),
      hasNextPage: filtered.length > page * 10,
      currentPage: page,
    };
  },

  /**
   * Mock get popular anime
   */
  getPopularAnime: async (page: number = 1) => {
    console.log(`[MOCK] Getting popular anime (page ${page})`);
    
    return {
      results: mockAnimeList.slice((page - 1) * 10, page * 10),
      hasNextPage: mockAnimeList.length > page * 10,
      currentPage: page,
    };
  },

  /**
   * Mock get recent anime
   */
  getRecentAnime: async (page: number = 1) => {
    console.log(`[MOCK] Getting recent anime (page ${page})`);
    
    return {
      results: mockAnimeList.slice((page - 1) * 10, page * 10).reverse(),
      hasNextPage: mockAnimeList.length > page * 10,
      currentPage: page,
    };
  },

  /**
   * Mock get anime info
   */
  getAnimeInfo: async (url: string) => {
    console.log(`[MOCK] Getting anime info: ${url}`);
    
    const anime =
      mockAnimeList[Math.floor(Math.random() * mockAnimeList.length)];

    return {
      ...anime,
      episodes: mockEpisodes,
      genres: ['Action', 'Adventure', 'Fantasy'],
      director: 'Masashi Kishimoto',
      studio: 'Studio Pierrot',
    };
  },

  /**
   * Mock get episode sources
   */
  getEpisodeSources: async (url: string) => {
    console.log(`[MOCK] Getting episode sources: ${url}`);
    
    return {
      sources: [
        {
          quality: '720p',
          url: 'https://example.com/video.m3u8',
          type: 'hls',
        },
        {
          quality: '1080p',
          url: 'https://example.com/video-1080p.m3u8',
          type: 'hls',
        },
      ],
      subtitles: [
        {
          lang: 'Spanish',
          url: 'https://example.com/subs-es.vtt',
        },
        {
          lang: 'English',
          url: 'https://example.com/subs-en.vtt',
        },
      ],
    };
  },
};
