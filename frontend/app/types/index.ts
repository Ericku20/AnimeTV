/**
 * Tipos para la API de Anime1v
 */

export interface Anime {
  id?: string;
  title: string;
  url: string;
  image?: string;
  type?: string;
  status?: string;
  synonyms?: string[];
}

export interface AnimeInfo extends Anime {
  synopsis?: string;
  genres?: string[];
  year?: number;
  episodes?: Episode[];
  rating?: number;
  director?: string;
  studio?: string;
}

export interface Episode {
  id?: string;
  number: number;
  title?: string;
  url: string;
  image?: string;
  releaseDate?: string;
}

export interface EpisodeSource {
  sources: VideoSource[];
  subtitles?: Subtitle[];
  servers?: string[];
}

export interface VideoSource {
  url: string;
  type: string; // hls, dash, mp4
  quality?: string; // 720p, 1080p, auto
}

export interface Subtitle {
  url: string;
  lang: string;
  format?: string;
}

export interface SearchResult {
  results: Anime[];
  hasNextPage: boolean;
  currentPage: number;
}

/**
 * Tipos para el estado local
 */

export interface UserAnime {
  animeUrl: string;
  title: string;
  image?: string;
  lastWatchedEpisode?: number;
  addedAt: number;
}

export interface WatchHistory {
  animeUrl: string;
  episode: number;
  timestamp: number;
  position: number; // en segundos
}

export interface Download {
  id: string;
  animeUrl: string;
  episodeNumber: number;
  status: 'pending' | 'downloading' | 'completed' | 'error';
  progress: number;
  error?: string;
  createdAt: number;
}

/**
 * Tipos para la UI
 */

export interface PlayerOptions {
  quality: 'auto' | '720p' | '1080p';
  subtitlesEnabled: boolean;
  subtitleLanguage: string;
  autoplay: boolean;
  skipIntro: boolean;
}

export interface FocusableElement {
  id: string;
  type: 'button' | 'card' | 'input' | 'custom';
  row: number;
  col: number;
  element: HTMLElement;
}

/**
 * Tipos para respuestas de la API
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
