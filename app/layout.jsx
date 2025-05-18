import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Emission Lab',
  description: 'Calculate your carbon emissions',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}