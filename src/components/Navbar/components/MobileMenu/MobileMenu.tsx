'use client';
import { type ReactElement, useEffect, useState, useCallback } from 'react';
import { MobileMenuLink } from './MobileMenuLink';
import { menuItems } from '../../menuItems';
import { FaGoogle } from 'react-icons/fa';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';
import { getProviders, signIn } from 'next-auth/react';
import { type Providers } from '../LogIn/LogIn';

interface MobileMenuProps {
  isOpen: boolean;
}

export const MobileMenu = ({ isOpen }: MobileMenuProps): ReactElement | null => {
  const [providers, setProviders] = useState<Providers | null>(null);
  const { isAuthenticated } = useIsAuthenticated();
  const isLogInVisible = providers !== null && !isAuthenticated;

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  const handleSignIn = useCallback(() => {
    signIn(providers?.google.id);
  }, [providers?.google.id]);

  return isOpen ? (
    <div id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {menuItems.map(item => (
          <MobileMenuLink key={item.path} {...item} />
        ))}
        {isLogInVisible ? (
          <button
            onClick={handleSignIn}
            className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5"
          >
            <FaGoogle className="mr-2" />
            <span>Login or Register</span>
          </button>
        ) : null}
      </div>
    </div>
  ) : null;
};
