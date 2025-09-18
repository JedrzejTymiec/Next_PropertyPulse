'use client';
import { getProviders, type ClientSafeProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { LogInButton } from './LogInButton';

export interface Providers {
  google: ClientSafeProvider;
}

export const LogIn = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  if (providers === null) {
    return null;
  }

  return (
    <div className="hidden md:block md:ml-6">
      <div className="flex items-center">
        <LogInButton id={providers.google.id} />
      </div>
    </div>
  );
};
