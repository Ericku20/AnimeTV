/**
 * Componente de tarjeta de anime (Card)
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AnimeCardProps {
  id?: string;
  title: string;
  image?: string;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
}

export default function AnimeCard({
  id,
  title,
  image,
  onClick,
  onFocus,
  onBlur,
  isFocused,
}: AnimeCardProps) {
  return (
    <motion.div
      id={id}
      data-focusable="true"
      className={`relative group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
        isFocused ? 'ring-2 ring-red-500 scale-105' : 'scale-100'
      }`}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Imagen */}
      <div className="relative aspect-[3/4] bg-gray-800 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Overlay al pasar el mouse */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold flex items-center gap-2 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Ver
          </button>
        </div>
      </div>

      {/* Información */}
      <div className="bg-gray-900 p-3">
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-red-500 transition-colors">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}
