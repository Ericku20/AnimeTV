/**
 * Componente de reproductor de video profesional
 * Usando hls.js para reproducción de HLS
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/app/store/app';

interface VideoPlayerProps {
  src: string;
  title: string;
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
  autoplay?: boolean;
  subtitles?: Array<{ src: string; lang: string; default?: boolean }>;
}

export default function VideoPlayer({
  src,
  title,
  onTimeUpdate,
  onEnded,
  autoplay = true,
  subtitles = [],
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState('auto');
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>('none');
  const [showSettings, setShowSettings] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const hlsRef = useRef<Hls>();
  const playerOptions = useAppStore((state) => state.playerOptions);

  // Inicializar reproductor HLS
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    // Limpiar instancia anterior
    if (hlsRef.current) {
      hlsRef.current.destroy();
    }

    // Si el navegador soporta HLS nativamente
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else if (Hls.isSupported()) {
      // Usar hls.js
      const hls = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hlsRef.current = hls;

      // Manejar errores
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('Error fatal en HLS:', data.details);
        }
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [src]);

  // Agregar pistas de subtítulos
  useEffect(() => {
    if (!videoRef.current) return;

    // Limpiar pistas existentes
    Array.from(videoRef.current.textTracks).forEach((track) => {
      if (track.kind === 'subtitles') {
        videoRef.current?.removeChild(track as any);
      }
    });

    // Agregar nuevas pistas
    subtitles.forEach((subtitle, idx) => {
      const track = document.createElement('track');
      track.kind = 'subtitles';
      track.label = subtitle.lang;
      track.srclang = subtitle.lang;
      track.src = subtitle.src;
      if (subtitle.default) {
        track.default = true;
      }
      videoRef.current?.appendChild(track);
    });
  }, [subtitles]);

  // Controles automáticos
  const handleMouseMove = () => {
    setShowControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Reproducción
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Actualizar tiempo
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);
    }
  };

  // Duración del video
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Cambiar tiempo
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Volumen
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  };

  // Pantalla completa
  const handleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        if (videoRef.current?.requestFullscreen) {
          await videoRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (error) {
      console.error('Error al cambiar pantalla completa:', error);
    }
  };

  // Formatear tiempo
  const formatTime = (time: number) => {
    if (!time) return '0:00';
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="relative w-full bg-black group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
        autoPlay={autoplay}
      >
        Tu navegador no soporta el reproductor de video
      </video>

      {/* Controles */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4"
          >
            {/* Barra de progreso */}
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-600 rounded cursor-pointer hover:h-2 transition-all"
            />

            {/* Controles principales */}
            <div className="flex items-center justify-between mt-3">
              {/* Izquierda */}
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-red-500 transition-colors"
                  aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                >
                  {isPlaying ? (
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Volumen */}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1 bg-gray-600 rounded cursor-pointer"
                  />
                </div>

                {/* Tiempo */}
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Derecha */}
              <div className="flex items-center gap-3">
                {/* Configuración */}
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l1.72-1.34c.15-.12.19-.34.1-.51l-1.63-2.83c-.12-.22-.37-.29-.59-.22l-2.03.81c-.42-.32-.9-.59-1.42-.78l-.31-2.15c-.04-.24-.24-.41-.48-.41h-3.26c-.24 0-.43.17-.47.41l-.31 2.15c-.52.19-1 .46-1.42.78l-2.03-.81c-.22-.09-.47 0-.59.22L2.74 8.87c-.09.17-.05.39.1.51l1.72 1.34c-.05.3-.07.62-.07.94s.02.64.07.94L2.84 14.28c-.15.12-.19.34-.1.51l1.63 2.83c.12.22.37.29.59.22l2.03-.81c.42.32.9.59 1.42.78l.31 2.15c.05.24.24.41.47.41h3.26c.24 0 .44-.17.47-.41l.31-2.15c.52-.19 1-.46 1.42-.78l2.03.81c.22.09.47 0 .59-.22l1.63-2.83c.09-.17.05-.39-.1-.51l-1.72-1.34zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                    </svg>
                  </button>

                  {/* Menú de configuración */}
                  {showSettings && (
                    <div className="absolute bottom-12 right-0 bg-gray-900 rounded-lg p-3 text-white text-sm w-48 space-y-2">
                      <div>
                        <p className="font-semibold mb-1">Calidad</p>
                        <select
                          value={selectedQuality}
                          onChange={(e) => setSelectedQuality(e.target.value)}
                          className="w-full bg-gray-800 rounded px-2 py-1"
                        >
                          <option value="auto">Automático</option>
                          <option value="720p">720p</option>
                          <option value="1080p">1080p</option>
                        </select>
                      </div>

                      {subtitles.length > 0 && (
                        <div>
                          <p className="font-semibold mb-1">Subtítulos</p>
                          <select
                            value={selectedSubtitle}
                            onChange={(e) => setSelectedSubtitle(e.target.value)}
                            className="w-full bg-gray-800 rounded px-2 py-1"
                          >
                            <option value="none">Ninguno</option>
                            {subtitles.map((sub) => (
                              <option key={sub.lang} value={sub.lang}>
                                {sub.lang}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Pantalla completa */}
                <button
                  onClick={handleFullscreen}
                  className="text-white hover:text-red-500 transition-colors"
                  aria-label="Pantalla completa"
                >
                  {isFullscreen ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de carga */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        {!isPlaying && (
          <button
            onClick={handlePlayPause}
            className="bg-red-600 hover:bg-red-700 rounded-full p-4 transition-colors"
          >
            <svg className="w-12 h-12 text-white fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
