/**
 * Página de favoritos
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '@/app/components/Header';
import AnimeCard from '@/app/components/AnimeCard';
import { useAppStore } from '@/app/store/app';
import { Anime } from '@/app/types';

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const appStore = useAppStore();

  useEffect(() => {
    appStore.initializeFromStorage();
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      setIsLoading(true);
      const favs = appStore.favorites;
      setFavorites(
        favs.map((f) => ({
          title: f.title,
          url: f.animeUrl,
          image: f.image,
        })) as Anime[]
      );
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

  const handleRemoveFavorite = (animeUrl: string) => {
    appStore.removeFavorite(animeUrl);
    setFavorites((prev) => prev.filter((f) => f.url !== animeUrl));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header onSearch={handleSearch} />

      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Favoritos</h1>
          <p className="text-gray-400">
            {favorites.length === 0
              ? 'No tienes favoritos aún'
              : `${favorites.length} anime en tu lista de favoritos`}
          </p>
        </motion.div>

        {/* Galería de favoritos */}
        {favorites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          >
            {favorites.map((anime) => (
              <div key={anime.url} className="group relative">
                <AnimeCard
                  title={anime.title}
                  image={anime.image}
                  onClick={() => handleAnimeClick(anime)}
                />
                {/* Botón para remover */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveFavorite(anime.url)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remover de favoritos"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>
            ))}
          </motion.div>
        ) : !isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <svg
              className="w-24 h-24 text-gray-600 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <p className="text-gray-400 text-2xl mb-4">Sin favoritos aún</p>
            <p className="text-gray-500 mb-8">Agrega anime a tu lista de favoritos para verlos aquí</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Explorar anime
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-[3/4] bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        )}
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
