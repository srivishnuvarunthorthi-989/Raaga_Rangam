import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Providers } from '@/components/providers';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'RaagaRangam - Interactive Carnatic Music Gaming Platform',
  description: 'Learn Carnatic music through gesture recognition and gamification. Master traditional ragas with innovative hand gesture controls.',
  keywords: 'carnatic music, indian classical music, music education, gesture recognition, raga learning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@300;400;500;600;700&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}