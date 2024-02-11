import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './contexts/authContext'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Plataforma SysCorrect',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <ToastContainer autoClose={2000} />

        </AuthProvider>

      </body>
    </html>
  )
}
