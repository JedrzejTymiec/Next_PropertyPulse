'use client';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getUnreadCount } from '@/app/actions/Message/getUnreadCount';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';

interface MessagesContextType {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
);

interface MessagesContextProviderProps {
  children: ReactNode;
}

export const MessagesContextProvider = ({
  children,
}: MessagesContextProviderProps) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const { isAuthenticated } = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      const getCount = async () => {
        const count = await getUnreadCount();
        setUnreadCount(count);
      };
      getCount();
    }
  }, [isAuthenticated]);

  return (
    <MessagesContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessagesContext = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error(
      'useMessagesContext must be used within MessagesContextProvider',
    );
  }
  return context;
};
