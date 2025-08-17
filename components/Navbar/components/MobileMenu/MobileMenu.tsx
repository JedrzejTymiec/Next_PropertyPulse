'use client';

import { type ReactElement } from 'react';
import { MobileMenuLink } from './MobileMenuLink';
import { menuItems } from '../../menuItems';

interface MobileMenuProps {
  isOpen: boolean;
}

export const MobileMenu = ({
  isOpen,
}: MobileMenuProps): ReactElement | null => {
  return isOpen ? (
    <div id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {menuItems.map((item) => (
          <MobileMenuLink key={item.path} {...item} />
        ))}
        <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5">
          <i className="fa-brands fa-google mr-2"></i>
          <span>Login or Register</span>
        </button>
      </div>
    </div>
  ) : null;
};
