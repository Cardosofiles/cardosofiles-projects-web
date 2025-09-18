import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import '@/styles/globals.css'
import { geistMono, geistSans } from '@/utils/fonts'

import { ActiveThemeProvider } from '@/components/themes/theme-active'
import { cn } from '@/lib/utils'

import { Header } from '@/components/layout/header'
import { NextThemeProvider } from '@/providers/next-theme'
import TanstackQueryProvider from '@/providers/tanstack-query'

export const metadata: Metadata = {
  metadataBase: new URL('https://cardosofiles-projects-web.vercel.app'),
  title: {
    default: 'Cardoso Files - Desenvolvedor Full Stack | Portfolio & Projetos',
    template: '%s | Cardoso Files',
  },
  description:
    'Desenvolvedor Full Stack especializado em React, Next.js e TypeScript. Explore 12 projetos demonstrando expertise em desenvolvimento web moderno, desde formulários dinâmicos até dashboards complexos.',
  keywords: [
    'desenvolvedor full stack',
    'react developer',
    'nextjs developer',
    'typescript developer',
    'portfolio desenvolvedor',
    'projetos web',
    'cardoso files',
    'desenvolvedor frontend',
    'desenvolvedor backend',
    'prisma orm',
    'tailwind css',
    'shadcn ui',
  ],
  authors: [{ name: 'Cardoso Files', url: 'https://cardosofiles.dev' }],
  creator: 'Cardoso Files',
  publisher: 'Cardoso Files',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://cardosofiles-projects-web.vercel.app',
    title: 'Cardoso Files - Desenvolvedor Full Stack | Portfolio & Projetos',
    description:
      'Desenvolvedor Full Stack especializado em React, Next.js e TypeScript. Explore 12 projetos demonstrando expertise em desenvolvimento web moderno.',
    siteName: 'Cardoso Files Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cardoso Files - Portfolio de Desenvolvedor Full Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cardoso Files - Desenvolvedor Full Stack | Portfolio & Projetos',
    description:
      'Desenvolvedor Full Stack especializado em React, Next.js e TypeScript. Explore projetos inovadores e soluções web modernas.',
    images: ['/og-image.png'],
    creator: '@cardosofiles',
  },
  verification: {
    google: 'google-verification-code', // Adicionar código do Google Search Console
  },
  alternates: {
    canonical: 'https://cardosofiles-projects-web.vercel.app',
  },
  category: 'technology',
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const activeThemeValue = cookieStore.get('active_theme')?.value
  const isScaled = activeThemeValue?.endsWith('-scaled')

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} bg antialiased`}
    >
      <body
        className={cn(
          // default styles
          'bg-background relative overscroll-none font-sans antialiased',
          // active theme styles
          activeThemeValue ? `theme-${activeThemeValue}` : '',
          // scaled theme styles
          isScaled ? 'theme-scaled' : ''
        )}
      >
        <TanstackQueryProvider>
          <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ActiveThemeProvider initialTheme={activeThemeValue}>
              <Header />
              <div className="h-16" /> {/* Spacer for fixed header */}
              <main className="mt-2">{children}</main>
            </ActiveThemeProvider>
          </NextThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  )
}
