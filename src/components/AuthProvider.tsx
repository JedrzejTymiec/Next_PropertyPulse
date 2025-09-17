'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import { type ReactNode } from 'react';
import { Spinner } from './Spinner';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvier = ({ children }: AuthProviderProps) => {
  return (
    <SessionProvider>
      <Authenticated>{children}</Authenticated>
    </SessionProvider>
  );
};

interface AuthenticatedProps {
  children: ReactNode;
}

const Authenticated = ({ children }: AuthenticatedProps) => {
  const session = useSession();

  if (session.status === 'loading') {
    return <Spinner />;
  }

  return <>{children}</>;
};
