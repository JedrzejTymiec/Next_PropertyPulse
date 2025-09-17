import { tv } from 'tailwind-variants';

export const labelVariants = tv({
  base: 'block',
  variants: {
    font: { bold: 'font-bold', normal: 'font-normal' },
    placement: { left: 'mr-2', top: 'mb-2' },
    color: { grey: 'text-gray-700', black: 'text-black' },
  },
  defaultVariants: {
    font: 'bold',
    placement: 'top',
    color: 'grey',
  },
});

export const inputVariants = tv({
  variants: {
    variant: {
      property: 'border rounded w-full py-2 px-3',
      search:
        'w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500',
      contact:
        'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
    },
  },
  defaultVariants: {
    variant: 'property',
  },
});
