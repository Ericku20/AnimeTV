/**
 * Rutas para anime
 */

import express from 'express';
import {
  searchAnime,
  getAnimeInfo,
  getEpisodeSources,
  getPopularAnime,
  getRecentAnime,
} from '../controllers/animeController';

const router = express.Router();

/**
 * GET /api/anime/search?q=keyword&page=1
 * Buscar anime por nombre
 */
router.get('/search', searchAnime);

/**
 * GET /api/anime/info?url=...
 * Obtener información detallada del anime
 */
router.get('/info', getAnimeInfo);

/**
 * GET /api/anime/episode?url=...
 * Obtener fuentes de video del episodio
 */
router.get('/episode', getEpisodeSources);

/**
 * GET /api/anime/popular?page=1
 * Obtener anime populares
 */
router.get('/popular', getPopularAnime);

/**
 * GET /api/anime/recent?page=1
 * Obtener anime recientes
 */
router.get('/recent', getRecentAnime);

export default router;
