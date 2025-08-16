import { type ReactNode } from 'react';
import { type Metadata } from 'next';
import '@/assets/styles/globals.css';

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
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
