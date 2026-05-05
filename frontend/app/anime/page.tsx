/**
 * Página de detalles del anime
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/app/components/Header';
import VideoPlayer from '@/app/components/VideoPlayer';
import Skeleton from '@/app/components/Skeleton';
import animeService from '@/app/services/api';
import storageService from '@/app/services/storage';
import { useAppStore } from '@/app/store/app';
import { AnimeInfo, Episode, UserAnime } from '@/app/types';

export default function AnimePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const animeUrl = searchParams.get('url') || '';

  const [animeInfo, setAnimeInfo] = useState<AnimeInfo | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [episodeLoading, setEpisodeLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const appStore = useAppStore();

  useEffect(() => {
    appStore.initializeFromStorage();
    if (animeUrl) {
      loadAnimeInfo();
    }
  }, [animeUrl]);

  const loadAnimeInfo = async () => {
    try {
      setIsLoading(true);
      const info = await animeService.getAnimeInfo(animeUrl);
      setAnimeInfo(info);

      // Verificar si es favorito
      const favorite = appStore.isFavorite(animeUrl);
      setIsFavorite(favorite);

      // Seleccionar primer episodio
      if (info.episodes && info.episodes.length > 0) {
        setSelectedEpisode(info.episodes[0]);
      }
    } catch (error) {
      console.error('Error loading anime:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEpisodeSelect = async (episode: Episode) => {
    try {
      setEpisodeLoading(true);
      setSelectedEpisode(episode);
      
      // Actualizar continuar viendo
      if (animeInfo) {
        const continuing: UserAnime = {
          animeUrl,
          title: animeInfo.title,
          image: animeInfo.image,
          lastWatchedEpisode: episode.number,
          addedAt: Date.now(),
        };
        appStore.updateContinueWatching(continuing);
      }
    } finally {
      setEpisodeLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    if (!animeInfo) return;

    const anime: UserAnime = {
      animeUrl,
      title: animeInfo.title,
      image: animeInfo.image,
      addedAt: Date.now(),
    };

    if (isFavorite) {
      appStore.removeFavorite(animeUrl);
      setIsFavorite(false);
    } else {
      appStore.addFavorite(anime);
      setIsFavorite(true);
    }
  };

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Header onSearch={handleSearch} />
        <div className="container-custom py-8">
          <Skeleton type="banner" className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Skeleton type="line" className="mb-4 w-1/3" />
              <Skeleton type="line" className="mb-4" />
              <Skeleton type="line" className="mb-4" />
            </div>
            <div>
              <Skeleton type="card" count={5} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!animeInfo) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Header onSearch={handleSearch} />
        <div className="container-custom py-16 text-center">
          <p className="text-2xl text-gray-400">Anime no encontrado</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Volver al inicio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header onSearch={handleSearch} />

      <div className="container-custom py-8">
        {/* Reproductor de video */}
        {selectedEpisode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <VideoPlayer
                src="https://example.com/video.m3u8"
                title={`${animeInfo.title} - ${selectedEpisode.title || `Episodio ${selectedEpisode.number}`}`}
                autoplay={true}
              />
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-2">
                {selectedEpisode.title || `Episodio ${selectedEpisode.number}`}
              </h2>
              <p className="text-gray-400">
                {animeInfo.title} • Episodio {selectedEpisode.number}
                {selectedEpisode.releaseDate && ` • ${selectedEpisode.releaseDate}`}
              </p>
            </div>
          </motion.div>
        )}

        {/* Información del anime */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contenido principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <h1 className="text-4xl font-bold">{animeInfo.title}</h1>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleToggleFavorite}
                  className={`p-3 rounded-full transition-colors ${
                    isFavorite
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.button>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-700">
                {animeInfo.type && (
                  <div>
                    <p className="text-gray-400 text-sm">Tipo</p>
                    <p className="font-semibold">{animeInfo.type}</p>
                  </div>
                )}
                {animeInfo.year && (
                  <div>
                    <p className="text-gray-400 text-sm">Año</p>
                    <p className="font-semibold">{animeInfo.year}</p>
                  </div>
                )}
                {animeInfo.status && (
                  <div>
                    <p className="text-gray-400 text-sm">Estado</p>
                    <p className="font-semibold">{animeInfo.status}</p>
                  </div>
                )}
                {animeInfo.rating && (
                  <div>
                    <p className="text-gray-400 text-sm">Rating</p>
                    <p className="font-semibold flex items-center gap-1">
                      <span>⭐</span>
                      {animeInfo.rating}
                    </p>
                  </div>
                )}
              </div>

              {/* Sinopsis */}
              {animeInfo.synopsis && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Sinopsis</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {animeInfo.synopsis}
                  </p>
                </div>
              )}

              {/* Géneros */}
              {animeInfo.genres && animeInfo.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Géneros</h3>
                  <div className="flex flex-wrap gap-2">
                    {animeInfo.genres.map((genre) => (
                      <span
                        key={genre}
                        className="bg-red-600/30 border border-red-600 px-3 py-1 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Director y Studio */}
              <div className="grid grid-cols-2 gap-4">
                {animeInfo.director && (
                  <div>
                    <p className="text-gray-400 text-sm">Director</p>
                    <p className="font-semibold">{animeInfo.director}</p>
                  </div>
                )}
                {animeInfo.studio && (
                  <div>
                    <p className="text-gray-400 text-sm">Estudio</p>
                    <p className="font-semibold">{animeInfo.studio}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar - Episodios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm sticky top-24">
              <h3 className="text-xl font-bold mb-4">
                Episodios ({animeInfo.episodes?.length || 0})
              </h3>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {animeInfo.episodes && animeInfo.episodes.length > 0 ? (
                  animeInfo.episodes.map((episode) => (
                    <motion.button
                      key={episode.url}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleEpisodeSelect(episode)}
                      disabled={episodeLoading}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        selectedEpisode?.url === episode.url
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-700/50 hover:bg-gray-700 text-gray-200'
                      } disabled:opacity-50`}
                    >
                      <div className="font-semibold text-sm">
                        Ep. {episode.number}
                      </div>
                      {episode.title && (
                        <div className="text-xs text-gray-400 line-clamp-1">
                          {episode.title}
                        </div>
                      )}
                    </motion.button>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No hay episodios disponibles</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 mt-12">
        <div className="container-custom text-center text-gray-400">
          <p>AnimeTV © 2024 - Plataforma de streaming de anime</p>
        </div>
      </footer>
    </main>
  );
}
