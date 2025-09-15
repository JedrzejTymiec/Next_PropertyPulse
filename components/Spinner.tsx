'use client';
import ClipLoader from 'react-spinners/ClipLoader';

interface SpinnerProps {
  color?: string;
  size?: number;
  margin?: string;
  display?: string;
}

export const Spinner = ({
  size = 150,
  margin = '100px auto',
  display = 'block',
  color = '#3b82f6',
}: SpinnerProps) => {
  return (
    <ClipLoader
      color={color}
      cssOverride={{
        display,
        margin,
      }}
      size={size}
      aria-label="Loading Spinner"
    />
  );
};
