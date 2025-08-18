'use client';

import Image from 'next/image';
import Link from 'next/link';
import profileDefault from '@/public/images/profile.png';
import { useCallback, useState } from 'react';

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <div className="relative ml-3">
      <div>
        <button
          type="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={toggleMenu}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <Image className="h-8 w-8 rounded-full" src={profileDefault} alt="" />
        </button>
      </div>
      {isOpen ? (
        <div
          id="user-menu"
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-0"
          >
            Your Profile
          </Link>
          <Link
            href="/properties/saved"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
          >
            Saved Properties
          </Link>
          <button
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
          >
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
};
