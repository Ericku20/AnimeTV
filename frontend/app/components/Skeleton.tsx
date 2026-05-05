/**
 * Componente Skeleton Loader
 */

'use client';

import React from 'react';

interface SkeletonProps {
  count?: number;
  className?: string;
  type?: 'card' | 'line' | 'circle' | 'banner';
}

export default function Skeleton({
  count = 1,
  className = '',
  type = 'card',
}: SkeletonProps) {
  const getSkeletonClass = () => {
    switch (type) {
      case 'card':
        return 'aspect-[3/4] rounded-lg';
      case 'line':
        return 'h-4 rounded';
      case 'circle':
        return 'w-12 h-12 rounded-full';
      case 'banner':
        return 'h-80 rounded-lg w-full';
      default:
        return 'rounded';
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`
            bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700
            animate-pulse
            ${getSkeletonClass()}
            ${className}
          `}
        />
      ))}
    </>
  );
}

/**
 * Componente para grid de skeletons
 */
export function SkeletonGrid({ count = 12, cols = 4 }) {
  return (
    <div className={`grid grid-cols-${cols} gap-4`}>
      {Array.from({ length: count }).map((_, idx) => (
        <Skeleton key={idx} type="card" />
      ))}
    </div>
  );
}
