'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from 'urql'

import { client } from '@/graphql/graphql'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider value={client}>{children}</Provider>
      </body>
    </html>
  )
}
