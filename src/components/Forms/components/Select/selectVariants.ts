import { tv } from 'tailwind-variants';

export const selectVariants = tv({
  variants: {
    variant: {
      property: 'border rounded w-full py-2 px-3',
      search:
        'w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500',
    },
  },
  defaultVariants: {
    variant: 'property',
  },
});
