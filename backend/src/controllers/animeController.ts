/**
 * Controladores para rutas de anime
 */

import { Request, Response } from 'express';
import animeService from '../services/animeService';
import { mockApiService } from '../services/mockAnimeService';
import { AppError, asyncHandler } from '../middlewares/errorHandler';

/**
 * Buscar anime
 */
export const searchAnime = asyncHandler(async (req: Request, res: Response) => {
  const { q, page = 1 } = req.query;

  if (!q || typeof q !== 'string') {
    throw new AppError(400, 'Parámetro de búsqueda requerido');
  }

  try {
    const data = await animeService.searchAnime(q, parseInt(String(page)));
    res.json({
      success: true,
      data,
      source: 'real',
    });
  } catch (error: any) {
    console.warn('⚠️  Fallback to mock API for search');
    const data = await mockApiService.searchAnime(q, parseInt(String(page)));
    res.json({
      success: true,
      data,
      source: 'mock',
      warning: 'Usando datos de ejemplo - API no disponible',
    });
  }
});

/**
 * Obtener información del anime
 */
export const getAnimeInfo = asyncHandler(
  async (req: Request, res: Response) => {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      throw new AppError(400, 'URL del anime requerida');
    }

    try {
      const data = await animeService.getAnimeInfo(url);
      res.json({
        success: true,
        data,
        source: 'real',
      });
    } catch (error: any) {
      console.warn('⚠️  Fallback to mock API for getAnimeInfo');
      const data = await mockApiService.getAnimeInfo(url);
      res.json({
        success: true,
        data,
        source: 'mock',
        warning: 'Usando datos de ejemplo - API no disponible',
      });
    }
  }
);

/**
 * Obtener fuentes de episodio
 */
export const getEpisodeSources = asyncHandler(
  async (req: Request, res: Response) => {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      throw new AppError(400, 'URL del episodio requerida');
    }

    try {
      const data = await animeService.getEpisodeSources(url);
      res.json({
        success: true,
        data,
        source: 'real',
      });
    } catch (error: any) {
      console.warn('⚠️  Fallback to mock API for getEpisodeSources');
      const data = await mockApiService.getEpisodeSources(url);
      res.json({
        success: true,
        data,
        source: 'mock',
        warning: 'Usando datos de ejemplo - API no disponible',
      });
    }
  }
);

/**
 * Obtener anime populares
 */
export const getPopularAnime = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1 } = req.query;

    try {
      const data = await animeService.getPopularAnime(parseInt(String(page)));
      res.json({
        success: true,
        data,
        source: 'real',
      });
    } catch (error: any) {
      console.warn('⚠️  Fallback to mock API for getPopularAnime');
      const data = await mockApiService.getPopularAnime(parseInt(String(page)));
      res.json({
        success: true,
        data,
        source: 'mock',
        warning: 'Usando datos de ejemplo - API no disponible',
      });
    }
  }
);

/**
 * Obtener anime recientes
 */
export const getRecentAnime = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1 } = req.query;

    try {
      const data = await animeService.getRecentAnime(parseInt(String(page)));
      res.json({
        success: true,
        data,
        source: 'real',
      });
    } catch (error: any) {
      console.warn('⚠️  Fallback to mock API for getRecentAnime');
      const data = await mockApiService.getRecentAnime(parseInt(String(page)));
      res.json({
        success: true,
        data,
        source: 'mock',
        warning: 'Usando datos de ejemplo - API no disponible',
      });
    }
  }
);
