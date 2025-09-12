import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface IsAuthenticatedReturnValue {
  isAuthenticated: boolean;
  userId: string | null;
}

interface SessionUserData {
  id: string;
  name: string;
  email: string;
  image: string;
}

export const useIsAuthenticated = (): IsAuthenticatedReturnValue => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const session = useSession();

  useEffect(() => {
    setIsAuthenticated(session.status === 'authenticated');
    setUserId((session.data?.user as SessionUserData)?.id ?? null);
  }, [session]);

  return {
    isAuthenticated,
    userId,
  };
};
