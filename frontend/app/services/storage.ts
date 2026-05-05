/**
 * Servicio para almacenamiento local (localStorage)
 */

import { UserAnime, WatchHistory, Download, PlayerOptions } from '@/app/types';

class StorageService {
  private readonly FAVORITES_KEY = 'anime_favorites';
  private readonly WATCH_HISTORY_KEY = 'anime_watch_history';
  private readonly DOWNLOADS_KEY = 'anime_downloads';
  private readonly PLAYER_OPTIONS_KEY = 'player_options';
  private readonly CONTINUE_WATCHING_KEY = 'continue_watching';

  /**
   * Obtener todos los favoritos
   */
  getFavorites(): UserAnime[] {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(this.FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  /**
   * Agregar a favoritos
   */
  addFavorite(anime: UserAnime): void {
    if (typeof window === 'undefined') return;

    try {
      const favorites = this.getFavorites();
      const exists = favorites.some((f) => f.animeUrl === anime.animeUrl);

      if (!exists) {
        favorites.push(anime);
        localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  }

  /**
   * Remover de favoritos
   */
  removeFavorite(animeUrl: string): void {
    if (typeof window === 'undefined') return;

    try {
      const favorites = this.getFavorites();
      const filtered = favorites.filter((f) => f.animeUrl !== animeUrl);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  }

  /**
   * Verificar si es favorito
   */
  isFavorite(animeUrl: string): boolean {
    return this.getFavorites().some((f) => f.animeUrl === animeUrl);
  }

  /**
   * Obtener historial de visualización
   */
  getWatchHistory(): WatchHistory[] {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(this.WATCH_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting watch history:', error);
      return [];
    }
  }

  /**
   * Agregar al historial
   */
  addToWatchHistory(entry: WatchHistory): void {
    if (typeof window === 'undefined') return;

    try {
      const history = this.getWatchHistory();
      const existingIndex = history.findIndex(
        (h) => h.animeUrl === entry.animeUrl && h.episode === entry.episode
      );

      if (existingIndex >= 0) {
        history[existingIndex] = entry;
      } else {
        history.push(entry);
      }

      // Limitar a los últimos 100
      const limited = history.slice(-100);
      localStorage.setItem(this.WATCH_HISTORY_KEY, JSON.stringify(limited));
    } catch (error) {
      console.error('Error adding to watch history:', error);
    }
  }

  /**
   * Obtener "Continuar viendo"
   */
  getContinueWatching(): UserAnime[] {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(this.CONTINUE_WATCHING_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting continue watching:', error);
      return [];
    }
  }

  /**
   * Actualizar "Continuar viendo"
   */
  updateContinueWatching(anime: UserAnime): void {
    if (typeof window === 'undefined') return;

    try {
      const continuing = this.getContinueWatching();
      const existingIndex = continuing.findIndex(
        (c) => c.animeUrl === anime.animeUrl
      );

      if (existingIndex >= 0) {
        continuing[existingIndex] = anime;
      } else {
        continuing.unshift(anime);
      }

      // Limitar a los últimos 20
      const limited = continuing.slice(0, 20);
      localStorage.setItem(this.CONTINUE_WATCHING_KEY, JSON.stringify(limited));
    } catch (error) {
      console.error('Error updating continue watching:', error);
    }
  }

  /**
   * Obtener opciones del reproductor
   */
  getPlayerOptions(): PlayerOptions {
    if (typeof window === 'undefined') {
      return this.getDefaultPlayerOptions();
    }

    try {
      const data = localStorage.getItem(this.PLAYER_OPTIONS_KEY);
      return data
        ? { ...this.getDefaultPlayerOptions(), ...JSON.parse(data) }
        : this.getDefaultPlayerOptions();
    } catch (error) {
      console.error('Error getting player options:', error);
      return this.getDefaultPlayerOptions();
    }
  }

  /**
   * Guardar opciones del reproductor
   */
  setPlayerOptions(options: PlayerOptions): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.PLAYER_OPTIONS_KEY, JSON.stringify(options));
    } catch (error) {
      console.error('Error setting player options:', error);
    }
  }

  /**
   * Opciones por defecto del reproductor
   */
  private getDefaultPlayerOptions(): PlayerOptions {
    return {
      quality: 'auto',
      subtitlesEnabled: true,
      subtitleLanguage: 'es',
      autoplay: true,
      skipIntro: false,
    };
  }

  /**
   * Obtener descargas
   */
  getDownloads(): Download[] {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(this.DOWNLOADS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting downloads:', error);
      return [];
    }
  }

  /**
   * Agregar descarga
   */
  addDownload(download: Download): void {
    if (typeof window === 'undefined') return;

    try {
      const downloads = this.getDownloads();
      downloads.push(download);
      localStorage.setItem(this.DOWNLOADS_KEY, JSON.stringify(downloads));
    } catch (error) {
      console.error('Error adding download:', error);
    }
  }

  /**
   * Actualizar descarga
   */
  updateDownload(downloadId: string, updates: Partial<Download>): void {
    if (typeof window === 'undefined') return;

    try {
      const downloads = this.getDownloads();
      const index = downloads.findIndex((d) => d.id === downloadId);

      if (index >= 0) {
        downloads[index] = { ...downloads[index], ...updates };
        localStorage.setItem(this.DOWNLOADS_KEY, JSON.stringify(downloads));
      }
    } catch (error) {
      console.error('Error updating download:', error);
    }
  }

  /**
   * Remover descarga
   */
  removeDownload(downloadId: string): void {
    if (typeof window === 'undefined') return;

    try {
      const downloads = this.getDownloads();
      const filtered = downloads.filter((d) => d.id !== downloadId);
      localStorage.setItem(this.DOWNLOADS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing download:', error);
    }
  }

  /**
   * Limpiar todo
   */
  clearAll(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(this.FAVORITES_KEY);
      localStorage.removeItem(this.WATCH_HISTORY_KEY);
      localStorage.removeItem(this.DOWNLOADS_KEY);
      localStorage.removeItem(this.CONTINUE_WATCHING_KEY);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

export default new StorageService();
