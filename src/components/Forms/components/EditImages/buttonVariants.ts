import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'px-3 py-1 rounded mt-1 text-white',
  variants: {
    variant: {
      delete: 'bg-red-500 hover:bg-red-600',
      restore: 'bg-blue-500 hover:bg-blue-600',
    },
  },
  defaultVariants: {
    variant: 'delete',
  },
});
