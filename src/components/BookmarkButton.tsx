'use client';
import { FaBookmark } from 'react-icons/fa';
import { bookmarkProperty } from '@/actions/Property/bookmarkProperty';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';
import { isBookmarked as checkIfBookmarked } from '@/actions/Property/isBookmarked';

interface BookmarkButtonProps {
  id: string;
  ownerId: string;
}

export const BookmarkButton = ({ id, ownerId }: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { isAuthenticated, userId } = useIsAuthenticated();
  const isVisible = isAuthenticated && userId !== ownerId;
  const color = isBookmarked ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600';

  useEffect(() => {
    if (isAuthenticated) {
      const check = async () => {
        const bookmarked = await checkIfBookmarked(id);
        setIsBookmarked(!!bookmarked);
      };
      check();
    }
  }, [id, isAuthenticated]);

  const onClick = useCallback(async () => {
    try {
      const message = await bookmarkProperty(id);
      setIsBookmarked(prev => !prev);
      toast.success(message);
    } catch (e) {
      toast.error(e as string);
    }
  }, [id]);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className={`${color} text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark aria-hidden="true" className="mr-2" />{' '}
      {isBookmarked ? 'Remove Bookmark' : 'Bookmark Property'}
    </button>
  );
};
