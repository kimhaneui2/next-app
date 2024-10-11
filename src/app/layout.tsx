import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import '../styles/css/base.css';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}