import { type ReactNode } from 'react';
import { type Metadata } from 'next';
import '@/styles/globals.css';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Property Pulse',
  keywords: 'rental, property, real estate',
  description: 'find perfect rental property',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
