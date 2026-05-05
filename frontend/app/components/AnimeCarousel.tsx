/**
 * Componente de carrusel horizontalpara anime
 */

'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AnimeCard from './AnimeCard';
import { Anime } from '@/app/types';

interface AnimeCarouselProps {
  title: string;
  items: Anime[];
  isLoading?: boolean;
  onItemClick?: (anime: Anime) => void;
}

export default function AnimeCarousel({
  title,
  items,
  isLoading = false,
  onItemClick,
}: AnimeCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 400;
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft +
      (direction === 'left' ? -scrollAmount : scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [items]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-8"
    >
      {/* Título */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 px-4 md:px-8">
        {title}
      </h2>

      {/* Contenedor del carrusel */}
      <div className="relative group">
        {/* Botón izquierdo */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-red-600 text-white p-3 rounded-full transition-all hidden md:flex items-center justify-center"
            aria-label="Desplazar izquierda"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
        )}

        {/* Carrusel */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide"
          onScroll={checkScroll}
        >
          <div className="flex gap-4 px-4 md:px-8 pb-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="flex-shrink-0 w-40 h-60 bg-gray-800 rounded-lg animate-pulse" />
                ))
              : items.map((anime) => (
                  <div key={anime.url} className="flex-shrink-0">
                    <AnimeCard
                      title={anime.title}
                      image={anime.image}
                      onClick={() => onItemClick?.(anime)}
                    />
                  </div>
                ))}
          </div>
        </div>

        {/* Botón derecho */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-red-600 text-white p-3 rounded-full transition-all hidden md:flex items-center justify-center"
            aria-label="Desplazar derecha"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        )}
      </div>
    </motion.section>
  );
}
