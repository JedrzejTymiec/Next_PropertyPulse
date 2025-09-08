'use client';
import Link from 'next/link';
import { type ReactNode } from 'react';

interface MenuItemProps {
  id: string;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

export const MenuItem = ({ id, children, href, onClick }: MenuItemProps) => {
  const isLink = typeof href === 'string';
  const Element = isLink ? Link : 'button';

  return (
    <Element
      className="block px-4 py-2 text-sm text-gray-700"
      href={href ?? ''}
      onClick={onClick}
      role="menuitem"
      tabIndex={-1}
      id={id}
    >
      {children}
    </Element>
  );
};
