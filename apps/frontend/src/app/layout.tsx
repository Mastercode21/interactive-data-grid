import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './styles.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Data Grid Component',
  description: 'Interactive Data Grid Component',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-screen w-screen overflow-hidden antialiased`}
    >
      <body className="bg-background text-color-text h-screen w-screen overflow-x-hidden leading-relaxed antialiased">
        {children}
      </body>
    </html>
  )
}
