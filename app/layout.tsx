import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Class of 2022 Reunion - 10th Batch',
  description: 'Join us for an unforgettable reunion celebrating the Class of 2022. Register now for dinner, memories, and fun!',
  keywords: 'reunion, class of 2022, school reunion, graduation, memories',
  openGraph: {
    title: 'Class of 2022 Reunion',
    description: 'Join us for an unforgettable reunion celebrating the Class of 2022',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          theme="dark"
          richColors
        />
      </body>
    </html>
  );
}