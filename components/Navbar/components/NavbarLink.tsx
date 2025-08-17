'use-client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarLink {
  path: string;
  text: string;
}

export const NavbarLink = ({ path, text }: NavbarLink) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`${
        isActive ? 'bg-black' : ''
      } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}>
      {text}
    </Link>
  );
};
