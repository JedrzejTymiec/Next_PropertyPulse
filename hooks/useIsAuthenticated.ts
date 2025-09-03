import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface IsAuthenticatedReturnValue {
  isAuthenticated: boolean;
  userId?: string;
}

export const useIsAuthenticated = (): IsAuthenticatedReturnValue => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { status } = useSession();

  useEffect(() => {
    setIsAuthenticated(status === 'authenticated');
  }, [status]);

  return {
    isAuthenticated,
  };
};
