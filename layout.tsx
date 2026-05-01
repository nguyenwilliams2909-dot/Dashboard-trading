import type { Metadata } from 'next'
import { VercelAnalytics } from './analytics'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trading Dashboard - FTMO & Lucid',
  description: 'Gestion complète de vos comptes FTMO Trading et Lucid Trading',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        {children}
        <VercelAnalytics />
      </body>
    </html>
  )
}
