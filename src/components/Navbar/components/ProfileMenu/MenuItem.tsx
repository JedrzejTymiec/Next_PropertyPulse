'use client';
import { type ProfileMenuElement, useProfileMenuContext } from '@/context/ProfileMenuContext';
import Link from 'next/link';
import {
  type ComponentPropsWithRef,
  type ReactNode,
  useRef,
  type ElementType,
  useEffect,
} from 'react';

type ButtonProps = ComponentPropsWithRef<'button'>;

interface MenuItemProps {
  id: string;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

export const MenuItem = ({ id, children, href, onClick }: MenuItemProps) => {
  const ref = useRef<ProfileMenuElement>(null);
  const { registerItem, unregisterItem, activeIndex, itemsRef } = useProfileMenuContext();
  const isLink = typeof href === 'string';
  const Button = 'button' as unknown as (props: ButtonProps) => JSX.Element;
  const Element: ElementType = isLink ? Link : Button;
  const index = ref.current ? itemsRef.current.indexOf(ref.current) : undefined;

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) registerItem(currentRef);
    return () => {
      if (currentRef) unregisterItem(currentRef);
    };
  }, [registerItem, unregisterItem]);

  return (
    <Element
      ref={ref}
      className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
      href={href ?? ''}
      onClick={onClick}
      role="menuitem"
      tabIndex={index === activeIndex ? 0 : -1}
      id={id}
    >
      {children}
    </Element>
  );
};
