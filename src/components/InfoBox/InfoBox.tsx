import Link from 'next/link';
import { type ReactNode } from 'react';
import { variants } from './variants';

interface InfoBoxLink {
  href: string;
  text: string;
}

interface InfoBoxProps {
  children: ReactNode;
  title: string;
  variant: 'gray' | 'blue';
  link: InfoBoxLink;
}

export const InfoBox = ({
  children,
  title,
  variant = 'gray',
  link,
}: InfoBoxProps) => {
  return (
    <div className={`${variants[variant].background} p-6 rounded-lg shadow-md`}>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-2 mb-4">{children}</p>
      <Link
        href={link.href}
        className={`inline-block ${variants[variant].buttonColor} text-white rounded-lg px-4 py-2 hover:${variants[variant].buttonHoverColor}`}
      >
        {link.text}
      </Link>
    </div>
  );
};
