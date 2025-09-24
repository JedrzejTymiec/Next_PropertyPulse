'use client';
import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export type ProfileMenuElement = HTMLAnchorElement | HTMLButtonElement;

interface ProfileMenuValue {
  itemsRef: React.MutableRefObject<ProfileMenuElement[]>;
  registerItem: (element: ProfileMenuElement) => void;
  unregisterItem: (element: ProfileMenuElement) => void;
  isOpen: boolean;
  close: () => void;
  toggle: () => void;
  activeIndex: number | null;
  increaseActiveIndex: () => void;
  decreaseActiveIndex: () => void;
  goToLast: () => void;
  goToFirst: () => void;
  activateCurrentItem: () => void;
}

interface ProfileMenuContextProviderProps {
  children: ReactNode;
}

const ProfileMenuContext = createContext<ProfileMenuValue | null>(null);

export const ProfileMenuContextProvider = ({ children }: ProfileMenuContextProviderProps) => {
  const itemsRef = useRef<ProfileMenuElement[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
    } else {
      setActiveIndex(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeIndex !== null) {
      itemsRef.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

  const registerItem = useCallback((el: ProfileMenuElement) => {
    if (!itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  }, []);

  const unregisterItem = useCallback((el: ProfileMenuElement) => {
    itemsRef.current = itemsRef.current.filter(item => item !== el);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const increaseActiveIndex = useCallback(() => {
    setActiveIndex(prev => {
      if (prev === null) return 0;
      return (prev + 1) % itemsRef.current.length;
    });
  }, []);

  const decreaseActiveIndex = useCallback(() => {
    setActiveIndex(prev => {
      if (prev === null) return itemsRef.current.length - 1;
      return (prev - 1 + itemsRef.current.length) % itemsRef.current.length;
    });
  }, []);

  const goToLast = useCallback(() => {
    setActiveIndex(itemsRef.current.length - 1);
  }, []);

  const goToFirst = useCallback(() => {
    setActiveIndex(0);
  }, []);

  const activateCurrentItem = useCallback(() => {
    if (activeIndex !== null) {
      itemsRef.current[activeIndex]?.click();
    }
  }, [activeIndex]);

  return (
    <ProfileMenuContext.Provider
      value={{
        itemsRef,
        registerItem,
        unregisterItem,
        isOpen,
        close,
        toggle,
        activeIndex,
        increaseActiveIndex,
        decreaseActiveIndex,
        goToLast,
        goToFirst,
        activateCurrentItem,
      }}
    >
      {children}
    </ProfileMenuContext.Provider>
  );
};

export const useProfileMenuContext = () => {
  const ctx = useContext(ProfileMenuContext);
  if (!ctx) throw new Error('useProfileMenuContext must be used inside ProfileMenuContextProvider');
  return ctx;
};
