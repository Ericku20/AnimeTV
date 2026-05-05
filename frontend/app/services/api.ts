/**
 * Servicio para interactuar con el backend proxy
 * El backend se comunica con la API de Anime1v
 */

import axios, { AxiosInstance } from 'axios';
import {
  Anime,
  AnimeInfo,
  Episode,
  EpisodeSource,
  SearchResult,
  ApiResponse,
} from '@/app/types';

class AnimeService {
  private client: AxiosInstance;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para manejo de errores
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        throw error;
      }
    );
  }

  /**
   * Buscar anime por nombre
   */
  async searchAnime(query: string, page: number = 1): Promise<SearchResult> {
    try {
      const response = await this.client.get<ApiResponse<SearchResult>>(
        '/anime/search',
        {
          params: { q: query, page },
        }
      );

      if (!response.data.success || !response.data.data) {
        throw new Error('Error en la búsqueda');
      }

      return response.data.data;
    } catch (error) {
      console.error('Error searching anime:', error);
      throw error;
    }
  }

  /**
   * Obtener información completa del anime
   */
  async getAnimeInfo(url: string): Promise<AnimeInfo> {
    try {
      const response = await this.client.get<ApiResponse<AnimeInfo>>(
        '/anime/info',
        {
          params: { url },
        }
      );

      if (!response.data.success || !response.data.data) {
        throw new Error('Error al obtener información del anime');
      }

      return response.data.data;
    } catch (error) {
      console.error('Error getting anime info:', error);
      throw error;
    }
  }

  /**
   * Obtener fuentes de video para un episodio
   */
  async getEpisodeSources(url: string): Promise<EpisodeSource> {
    try {
      const response = await this.client.get<ApiResponse<EpisodeSource>>(
        '/anime/episode',
        {
          params: { url },
        }
      );

      if (!response.data.success || !response.data.data) {
        throw new Error('Error al obtener fuentes del episodio');
      }

      return response.data.data;
    } catch (error) {
      console.error('Error getting episode sources:', error);
      throw error;
    }
  }

  /**
   * Obtener anime populares
   */
  async getPopularAnime(page: number = 1): Promise<SearchResult> {
    try {
      const response = await this.client.get<ApiResponse<SearchResult>>(
        '/anime/popular',
        {
          params: { page },
        }
      );

      if (!response.data.success || !response.data.data) {
        throw new Error('Error al obtener anime populares');
      }

      return response.data.data;
    } catch (error) {
      console.error('Error getting popular anime:', error);
      throw error;
    }
  }

  /**
   * Obtener anime recientes
   */
  async getRecentAnime(page: number = 1): Promise<SearchResult> {
    try {
      const response = await this.client.get<ApiResponse<SearchResult>>(
        '/anime/recent',
        {
          params: { page },
        }
      );

      if (!response.data.success || !response.data.data) {
        throw new Error('Error al obtener anime recientes');
      }

      return response.data.data;
    } catch (error) {
      console.error('Error getting recent anime:', error);
      throw error;
    }
  }
}

export default new AnimeService();
