import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import QueryClientProvider from './queryClientProvider'
import Header from './components/header/index'
import ClientProvider from './clientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Pokedex',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <QueryClientProvider>
          <ClientProvider>
            {children}
          </ClientProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
