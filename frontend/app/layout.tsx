/**
 * Layout principal de la aplicación
 */

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AnimeTV - Plataforma de Streaming de Anime',
  description:
    'Disfruta de tus anime favoritos en alta calidad. Streaming profesional tipo Netflix/Crunchyroll',
  keywords: [
    'anime',
    'streaming',
    'anime online',
    'netflix de anime',
    'crunchyroll alternativa',
  ],
  authors: [{ name: 'AnimeTV Team' }],
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
    userScalable: false,
  },
  openGraph: {
    title: 'AnimeTV',
    description: 'Plataforma de streaming de anime profesional',
    type: 'website',
    url: 'https://animetv.local',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0f0f0f" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23ef4444'>🎬</text></svg>" />
      </head>
      <body className="bg-dark-bg text-white antialiased">
        {children}
      </body>
    </html>
  );
}
