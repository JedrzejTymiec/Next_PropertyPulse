'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuLinkProps {
  path: string;
  text: string;
}

export const MobileMenuLink = ({ path, text }: MobileMenuLinkProps) => {
  const pathname = usePathname();
  const isActive = path === pathname;
  return (
    <Link
      href={path}
      className={`${
        isActive ? 'bg-black' : ''
      } text-white block rounded-md px-3 py-2 text-base font-medium`}
    >
      {text}
    </Link>
  );
};
