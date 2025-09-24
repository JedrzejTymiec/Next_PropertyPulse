'use client';
import Image from 'next/image';
import profileDefault from '@/assets/images/profile.png';
import { useCallback, type FocusEventHandler, type KeyboardEvent } from 'react';
import { MenuItem } from './MenuItem';
import { paths } from '@/constants/paths';
import { useSession, signOut } from 'next-auth/react';
import { useProfileMenuContext } from '@/context/ProfileMenuContext';

export const ProfileMenu = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const {
    isOpen,
    close,
    toggle,
    increaseActiveIndex,
    decreaseActiveIndex,
    goToFirst,
    goToLast,
    activateCurrentItem,
  } = useProfileMenuContext();

  const handleBlur: FocusEventHandler<HTMLUListElement> = useCallback(
    e => {
      if (e.currentTarget.contains(e.relatedTarget as Node)) {
        return;
      }
      close();
    },
    [close],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLUListElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        increaseActiveIndex();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        decreaseActiveIndex();
      }
      if (e.key === 'Home') {
        e.preventDefault();
        goToFirst();
      }
      if (e.key === 'End') {
        e.preventDefault();
        goToLast();
      }
      if (e.key === ' ') {
        e.preventDefault();
        activateCurrentItem();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    },
    [
      increaseActiveIndex,
      decreaseActiveIndex,
      goToFirst,
      goToLast,
      activateCurrentItem,
      close,
    ],
  );

  const handleSignOut = useCallback(() => {
    signOut();
    close();
  }, [close]);

  return (
    <div className="relative ml-3">
      <div>
        <button
          type="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-controls="user-menu"
          onClick={toggle}
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
        <ul
          id="user-menu"
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        >
          <li>
            <MenuItem
              href={paths.profile}
              onClick={toggle}
              id="user-menu-item-0"
            >
              Your Profile
            </MenuItem>
          </li>
          <li>
            <MenuItem
              href={paths.savedProperties}
              onClick={toggle}
              id="user-menu-item-1"
            >
              Saved Properties
            </MenuItem>
          </li>
          <li>
            <MenuItem onClick={handleSignOut} id="user-menu-item-2">
              Sign Out
            </MenuItem>
          </li>
        </ul>
      ) : null}
    </div>
  );
};
