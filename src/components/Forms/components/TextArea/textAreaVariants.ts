import { tv } from 'tailwind-variants';

export const textAreaVariants = tv({
  base: 'border rounded w-full py-2 px-3',
  variants: {
    variant: {
      contact: 'shadow appearance-none text-gray-700 h-44 focus:outline-none focus:shadow-outline',
    },
  },
});
