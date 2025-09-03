'use client';

import { FaBookmark } from 'react-icons/fa';
import { bookmarkProperty } from '@/app/actions/bookmarkProperty';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';
import { isBookmarked as checkIfBookmarked } from '@/app/actions/isBookmarked';

interface BookmarkButtonProps {
  id: string;
}

export const BookmarkButton = ({ id }: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { isAuthenticated } = useIsAuthenticated();

  useEffect(() => {
    const check = async () => {
      const bookmarked = await checkIfBookmarked(id);
      setIsBookmarked(!!bookmarked);
    };
    check();
  }, []);

  const onClick = useCallback(async () => {
    try {
      const message = await bookmarkProperty(id);
      setIsBookmarked((prev) => !prev);
      toast.success(message);
    } catch (e) {
      toast.error(e as string);
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" />{' '}
      {isBookmarked ? 'Remove Bookmark' : 'Bookmark Property'}
    </button>
  );
};
