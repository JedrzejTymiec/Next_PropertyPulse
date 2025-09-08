'use client';
import { useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { paths } from '@/constants/paths';

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
}

export const Pagination = ({ page, pageSize, total }: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);
  const isNextDisabled = page >= totalPages;
  const isPreviousDisabled = page <= 1;
  const searchParams = useSearchParams().toString();
  const router = useRouter();

  const handleNext = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', (page + 1).toString());
    const url = `${paths.properties}?${newParams}`;
    router.replace(url);
  }, [page, router, searchParams]);

  const handlePrevious = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', (page - 1).toString());
    const url = `${paths.properties}?${newParams}`;
    router.replace(url);
  }, [page, router, searchParams]);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        onClick={handlePrevious}
        className="mr-2 px-2 py-1 border border-gray-300 rounded disabled:text-gray-500"
        disabled={isPreviousDisabled}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        className="ml-2 px-2 py-1 border border-gray-300 rounded disabled:text-gray-500"
        disabled={isNextDisabled}
      >
        Next
      </button>
    </section>
  );
};
