'use client';
import { useState, useCallback } from 'react';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { MobileMenuButton } from './components/MobileMenu/MobileMenuButton';
import { menuItems } from './menuItems';
import { NavbarLink } from './components/NavbarLink';
import { ProfileMenu } from './components/ProfileMenu/ProfileMenu';
import { Notifications } from './components/Notifications/Notifications';
import { Logo } from './components/Logo';
import { LogIn } from './components/LogIn/LogIn';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { isAuthenticated } = useIsAuthenticated();

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prevState) => !prevState);
  }, []);

  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <MobileMenuButton onClick={toggleMobileMenu} />
            <Logo />
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                {menuItems.map((item) => (
                  <NavbarLink key={item.path} {...item} />
                ))}
              </div>
            </div>
          </div>
          {isAuthenticated ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <Notifications />
              <ProfileMenu />
            </div>
          ) : (
            <LogIn />
          )}
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} />
    </nav>
  );
};
