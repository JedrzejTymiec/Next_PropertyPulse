'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface MessagesContextType {
  unreadCount: number;
  setUnreadCount: (newCount: number) => void;
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
