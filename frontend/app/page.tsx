/**
 * Página de inicio (Home)
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/app/components/Header';
import AnimeCarousel from '@/app/components/AnimeCarousel';
import Skeleton from '@/app/components/Skeleton';
import animeService from '@/app/services/api';
import { useAppStore } from '@/app/store/app';
import { Anime, SearchResult } from '@/app/types';

export default function HomePage() {
  const router = useRouter();
  const [featuredAnime, setFeaturedAnime] = useState<Anime | null>(null);
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [recentAnime, setRecentAnime] = useState<Anime[]>([]);
  const [continueWatching, setContinueWatching] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const appStore = useAppStore();
  const continuing = appStore.continueWatching;

  useEffect(() => {
    appStore.initializeFromStorage();
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setIsLoading(true);

      // Cargar popular y reciente en paralelo
      const [popular, recent] = await Promise.all([
        animeService.getPopularAnime(1),
        animeService.getRecentAnime(1),
      ]);

      setPopularAnime(popular.results.slice(0, 12));
      setRecentAnime(recent.results.slice(0, 12));

      // Usar el primer anime popular como featured
      if (popular.results.length > 0) {
        setFeaturedAnime(popular.results[0]);
      }

      // Convertir continueWatching del store a Anime
      setContinueWatching(
        continuing.map((item) => ({
          title: item.title,
          url: item.animeUrl,
          image: item.image,
        })) as Anime[]
      );
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleAnimeClick = (anime: Anime) => {
    router.push(`/anime?url=${encodeURIComponent(anime.url)}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header onSearch={handleSearch} />

      {/* Featured Anime Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 md:h-[500px] overflow-hidden"
      >
        {isLoading ? (
          <Skeleton type="banner" />
        ) : featuredAnime ? (
          <>
            {/* Fondo */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${featuredAnime.image})`,
                filter: 'blur(10px) brightness(0.4)',
              }}
            />

            {/* Contenido */}
            <div className="relative h-full flex items-center">
              <div className="container-custom max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                    {featuredAnime.title}
                  </h1>

                  <p className="text-gray-300 max-w-2xl text-lg drop-shadow">
                    Descubre este increíble anime y disfruta de episodios en alta calidad.
                  </p>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnimeClick(featuredAnime)}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Ver ahora
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      Agregar a favoritos
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        ) : null}
      </motion.section>

      {/* Continuar viendo */}
      {continueWatching.length > 0 && (
        <div className="container-custom py-8">
          <AnimeCarousel
            title="Continuar viendo"
            items={continueWatching}
            isLoading={isLoading}
            onItemClick={handleAnimeClick}
          />
        </div>
      )}

      {/* Popular */}
      <div className="container-custom py-8">
        <AnimeCarousel
          title="Popular ahora"
          items={popularAnime}
          isLoading={isLoading}
          onItemClick={handleAnimeClick}
        />
      </div>

      {/* Reciente */}
      <div className="container-custom py-8 pb-16">
        <AnimeCarousel
          title="Agregados recientemente"
          items={recentAnime}
          isLoading={isLoading}
          onItemClick={handleAnimeClick}
        />
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="container-custom text-center text-gray-400">
          <p className="mb-2">AnimeTV © 2024 - Plataforma de streaming de anime</p>
          <p className="text-sm">
            Powered by{' '}
            <a
              href="https://github.com/FxxMorgan/anime1v-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-500"
            >
              Anime1v API
            </a>{' '}
            by FxxMorgan
          </p>
        </div>
      </footer>
    </main>
  );
}
