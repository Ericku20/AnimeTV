/**
 * Servicio para comunicarse con la API de Anime1v
 * Documentación: https://github.com/FxxMorgan/anime1v-api
 */

import axios, { AxiosInstance } from 'axios';

interface SearchResponse {
  data?: any[];
  hasNextPage?: boolean;
  currentPage?: number;
  results?: any[];
}

interface AnimeInfoResponse {
  data?: any;
  info?: any;
}

interface EpisodeResponse {
  data?: any;
  sources?: any[];
}

class AnimeAPIService {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.ANIME1V_API_BASE_URL || 'https://api.anime1.com';
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 15000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    console.log(`✅ AnimeAPI Service initialized with: ${this.baseUrl}`);
  }

  /**
   * Buscar anime
   */
  async searchAnime(
    query: string,
    page: number = 1
  ): Promise<{
    results: any[];
    hasNextPage: boolean;
    currentPage: number;
  }> {
    try {
      console.log(`🔍 Searching anime: "${query}" (page ${page})`);
      
      const response = await this.client.get<SearchResponse>(
        `/search?q=${encodeURIComponent(query)}&page=${page}`
      );

      const results = response.data.results || response.data.data || [];
      console.log(`✅ Found ${results.length} anime`);

      return {
        results,
        hasNextPage: response.data.hasNextPage || false,
        currentPage: response.data.currentPage || page,
      };
    } catch (error: any) {
      console.error(`❌ Error searching anime: ${error.message}`);
      throw new Error(`Error al buscar anime: ${error.message}`);
    }
  }

  /**
   * Obtener información del anime
   */
  async getAnimeInfo(url: string): Promise<any> {
    try {
      console.log(`📺 Getting anime info from: ${url}`);
      
      const response = await this.client.get<AnimeInfoResponse>(
        `/info?url=${encodeURIComponent(url)}`
      );

      const data = response.data.data || response.data.info || response.data;
      console.log(`✅ Got anime info: ${data.title || 'Unknown'}`);
      
      return data;
    } catch (error: any) {
      console.error(`❌ Error getting anime info: ${error.message}`);
      throw new Error(`Error al obtener información del anime: ${error.message}`);
    }
  }

  /**
   * Obtener fuentes de video del episodio
   */
  async getEpisodeSources(url: string): Promise<any> {
    try {
      console.log(`🎬 Getting episode sources from: ${url}`);
      
      const response = await this.client.get<EpisodeResponse>(
        `/episode?url=${encodeURIComponent(url)}`
      );

      const data = response.data.data || response.data.sources || response.data;
      console.log(`✅ Got episode sources`);
      
      return data;
    } catch (error: any) {
      console.error(`❌ Error getting episode sources: ${error.message}`);
      throw new Error(`Error al obtener fuentes del episodio: ${error.message}`);
    }
  }

  /**
   * Obtener anime populares
   */
  async getPopularAnime(page: number = 1): Promise<{
    results: any[];
    hasNextPage: boolean;
    currentPage: number;
  }> {
    try {
      console.log(`⭐ Getting popular anime (page ${page})`);
      
      const response = await this.client.get<SearchResponse>(
        `/popular?page=${page}`
      );

      const results = response.data.results || response.data.data || [];
      console.log(`✅ Got ${results.length} popular anime`);

      return {
        results,
        hasNextPage: response.data.hasNextPage || false,
        currentPage: response.data.currentPage || page,
      };
    } catch (error: any) {
      console.error(`❌ Error getting popular anime: ${error.message}`);
      throw new Error(`Error al obtener anime populares: ${error.message}`);
    }
  }

  /**
   * Obtener anime recientes
   */
  async getRecentAnime(page: number = 1): Promise<{
    results: any[];
    hasNextPage: boolean;
    currentPage: number;
  }> {
    try {
      console.log(`🆕 Getting recent anime (page ${page})`);
      
      const response = await this.client.get<SearchResponse>(
        `/recent?page=${page}`
      );

      const results = response.data.results || response.data.data || [];
      console.log(`✅ Got ${results.length} recent anime`);

      return {
        results,
        hasNextPage: response.data.hasNextPage || false,
        currentPage: response.data.currentPage || page,
      };
    } catch (error: any) {
      console.error(`❌ Error getting recent anime: ${error.message}`);
      throw new Error(`Error al obtener anime recientes: ${error.message}`);
    }
  }
}

export default new AnimeAPIService();
