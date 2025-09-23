import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import { paths } from '@/constants/paths';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Property Pulse" width={32} height={32} />
        </div>
        <nav
          aria-label="footer-navigation"
          className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0"
        >
          <ul className="flex space-x-4">
            <li>
              <Link href={paths.properties}>Properties</Link>
            </li>
            <li>
              <Link href={paths.home}>Terms of Service</Link>
            </li>
          </ul>
        </nav>
        <div>
          <small className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentYear} PropertyPulse. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};
