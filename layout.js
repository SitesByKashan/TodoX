import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TodoX - The Best Todo List',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='logo.svg'></link>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}