import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'MISOHA | Mind Souls Health - Wellness Nutrition India',
  description:
    'MISOHA - Mind, Souls, Health. Premium overnight oats and wellness shots for your mental, spiritual, and physical wellbeing. Order pre-made fresh nutrition delivered to your door.',
  generator: 'v0.app',
  icons: {
    icon: '/images/brand-icon.png',
    apple: '/images/brand-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${poppins.variable} ${playfair.variable}`}>
      <body className="font-poppins antialiased bg-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
