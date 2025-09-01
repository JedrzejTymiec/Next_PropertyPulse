'use client';

import Image from 'next/image';
import profileDefault from '@/assets/images/profile.png';
import { useCallback, useState } from 'react';
import { MenuItem } from './MenuItem';
import { paths } from '@/constants/paths';
import { useSession, signOut } from 'next-auth/react';

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  const profileImage = session?.user?.image;

  const toggleMenu = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const handleSignOut = useCallback(() => {
    signOut();
    setIsOpen(false);
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
          <Image
            className="h-8 w-8 rounded-full"
            src={profileImage ?? profileDefault}
            width={64}
            height={64}
            alt=""
          />
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
          <MenuItem
            href={paths.profile}
            onClick={toggleMenu}
            id="user-menu-item-0"
          >
            Your Profile
          </MenuItem>
          <MenuItem
            href={paths.savedProperties}
            onClick={toggleMenu}
            id="user-menu-item-1"
          >
            Saved Properties
          </MenuItem>
          <MenuItem onClick={handleSignOut} id="user-menu-item-2">
            Sign Out
          </MenuItem>
        </div>
      ) : null}
    </div>
  );
};
