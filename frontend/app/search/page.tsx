/**
 * Página de búsqueda
 */

'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import AnimeCard from '@/app/components/AnimeCard';
import Skeleton from '@/app/components/Skeleton';
import animeService from '@/app/services/api';
import { Anime } from '@/app/types';
import { motion } from 'framer-motion';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchInput, setSearchInput] = useState(query);
  const [error, setError] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Buscar cuando cambia el query
  useEffect(() => {
    if (query) {
      setSearchInput(query);
      setResults([]);
      setCurrentPage(1);
      performSearch(query, 1);
    }
  }, [query]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        hasMore &&
        !isLoading &&
        results.length > 0
      ) {
        loadMore();
      }
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, results]);

  const performSearch = useCallback(async (searchQuery: string, page: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await animeService.searchAnime(searchQuery, page);

      if (page === 1) {
        setResults(data.results || []);
      } else {
        setResults((prev) => [...prev, ...(data.results || [])]);
      }

      setHasMore(data.hasNextPage || false);
      setCurrentPage(page);
    } catch (err) {
      console.error('Search error:', err);
      setError('Error al buscar anime. Por favor, intenta de nuevo.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = async () => {
    await performSearch(query, currentPage + 1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  const handleAnimeClick = (anime: Anime) => {
    router.push(`/anime?url=${encodeURIComponent(anime.url)}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header onSearch={(q) => setSearchInput(q)} />

      <div className="container-custom py-8">
        {/* Búsqueda actual */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar anime..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-red-600 text-lg"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </div>
          </form>

          {query && (
            <p className="text-gray-400 text-lg">
              Resultados para: <span className="text-white font-semibold">"{query}"</span>
              {results.length > 0 && <span> ({results.length} encontrados)</span>}
            </p>
          )}
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/30 border border-red-700 text-red-200 px-6 py-4 rounded-lg mb-8"
          >
            {error}
          </motion.div>
        )}

        {/* Resultados */}
        {results.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          >
            {results.map((anime) => (
              <AnimeCard
                key={anime.url}
                title={anime.title}
                image={anime.image}
                onClick={() => handleAnimeClick(anime)}
              />
            ))}
          </motion.div>
        ) : !isLoading && query ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-400 text-xl">No se encontraron resultados para "{query}"</p>
            <p className="text-gray-500 mt-2">Intenta con otro término de búsqueda</p>
          </motion.div>
        ) : (
          !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-400 text-xl">Busca un anime para comenzar</p>
            </motion.div>
          )
        )}

        {/* Skeleton loading */}
        {isLoading && results.length === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, idx) => (
              <Skeleton key={idx} type="card" />
            ))}
          </div>
        )}

        {/* Infinite scroll trigger */}
        {hasMore && results.length > 0 && (
          <div ref={observerTarget} className="mt-8 text-center">
            {isLoading && (
              <div className="flex justify-center items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            )}
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
