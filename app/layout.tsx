import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DropLink - Universal File Sharing Platform',
  description: 'Share files instantly with unique links. No signup required for downloads. Secure, fast, and reliable file sharing for everyone.',
  keywords: 'file sharing, file upload, file download, share files, cloud storage, file hosting',
  authors: [{ name: 'DropLink Team' }],
  openGraph: {
    title: 'DropLink - Universal File Sharing Platform',
    description: 'Share files instantly with unique links. No signup required for downloads.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}

