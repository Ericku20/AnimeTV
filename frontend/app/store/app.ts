/**
 * Store global con Zustand
 */

import { create } from 'zustand';
import { Anime, UserAnime, PlayerOptions } from '@/app/types';
import storageService from '@/app/services/storage';

interface AppStore {
  // State
  favorites: UserAnime[];
  continueWatching: UserAnime[];
  playerOptions: PlayerOptions;
  currentAnime: Anime | null;
  isLoading: boolean;
  error: string | null;
  theme: 'dark' | 'light';

  // Acciones
  addFavorite: (anime: UserAnime) => void;
  removeFavorite: (animeUrl: string) => void;
  isFavorite: (animeUrl: string) => boolean;
  updateContinueWatching: (anime: UserAnime) => void;
  setPlayerOptions: (options: PlayerOptions) => void;
  setCurrentAnime: (anime: Anime | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  initializeFromStorage: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  // State inicial
  favorites: [],
  continueWatching: [],
  playerOptions: {
    quality: 'auto',
    subtitlesEnabled: true,
    subtitleLanguage: 'es',
    autoplay: true,
    skipIntro: false,
  },
  currentAnime: null,
  isLoading: false,
  error: null,
  theme: 'dark',

  // Acciones
  addFavorite: (anime: UserAnime) => {
    const state = get();
    if (!state.favorites.some((f) => f.animeUrl === anime.animeUrl)) {
      set((state) => ({
        favorites: [...state.favorites, anime],
      }));
      storageService.addFavorite(anime);
    }
  },

  removeFavorite: (animeUrl: string) => {
    set((state) => ({
      favorites: state.favorites.filter((f) => f.animeUrl !== animeUrl),
    }));
    storageService.removeFavorite(animeUrl);
  },

  isFavorite: (animeUrl: string) => {
    return get().favorites.some((f) => f.animeUrl === animeUrl);
  },

  updateContinueWatching: (anime: UserAnime) => {
    const state = get();
    const existing = state.continueWatching.findIndex(
      (c) => c.animeUrl === anime.animeUrl
    );

    if (existing >= 0) {
      const updated = [...state.continueWatching];
      updated[existing] = anime;
      set({ continueWatching: updated });
    } else {
      set((state) => ({
        continueWatching: [anime, ...state.continueWatching],
      }));
    }

    storageService.updateContinueWatching(anime);
  },

  setPlayerOptions: (options: PlayerOptions) => {
    set({ playerOptions: options });
    storageService.setPlayerOptions(options);
  },

  setCurrentAnime: (anime: Anime | null) => {
    set({ currentAnime: anime });
  },

  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setTheme: (theme: 'dark' | 'light') => {
    set({ theme });
  },

  initializeFromStorage: () => {
    const favorites = storageService.getFavorites();
    const continueWatching = storageService.getContinueWatching();
    const playerOptions = storageService.getPlayerOptions();

    set({
      favorites,
      continueWatching,
      playerOptions,
    });
  },
}));
