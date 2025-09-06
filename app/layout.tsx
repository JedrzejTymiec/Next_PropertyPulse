import { type ReactNode } from 'react';
import { type Metadata } from 'next';
import '@/styles/globals.css';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer';
import { AuthProvier } from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { MessagesContextProvider } from '@/context/MessagesContext';

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
    <AuthProvier>
      <MessagesContextProvider>
        <html>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </MessagesContextProvider>
    </AuthProvier>
  );
};

export default RootLayout;
