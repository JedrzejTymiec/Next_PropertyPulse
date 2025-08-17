import Image from 'next/image';
import Link from 'next/link';
import { paths } from '@/constants/paths';
import LogoPng from '@/assets/images/logo-white.png';

export const Logo = () => {
  return (
    <Link className="flex flex-shrink-0 items-center" href={paths.home}>
      <Image className="h-10 w-auto" src={LogoPng} alt="PropertyPulse" />

      <span className="hidden md:block text-white text-2xl font-bold ml-2">
        PropertyPulse
      </span>
    </Link>
  );
};
