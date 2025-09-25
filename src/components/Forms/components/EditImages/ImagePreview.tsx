import Image from 'next/image';
import { generateAltText } from '@/utils';
import { useCallback } from 'react';
import clsx from 'clsx';
import { buttonVariants } from './buttonVariants';

interface ImagePreviewProps {
  image: string;
  isForDelete: boolean;
  city: string;
  type: string;
  onDelete: (image: string) => void;
  onRestore: (image: string) => void;
}

export const ImagePreview = ({
  image,
  isForDelete,
  city,
  type,
  onDelete,
  onRestore,
}: ImagePreviewProps) => {
  const handleDelete = useCallback(() => {
    onDelete(image);
  }, [onDelete, image]);

  const handleRestore = useCallback(() => {
    onRestore(image);
  }, [onRestore, image]);

  return (
    <div key={image} className="text-center">
      <Image
        src={image}
        alt={generateAltText(city, type)}
        width={1280}
        height={720}
        className={clsx(
          'rounded',
          isForDelete ? 'grayscale opacity-75' : undefined,
        )}
      />
      <button
        type="button"
        onClick={isForDelete ? handleRestore : handleDelete}
        className={buttonVariants({
          variant: isForDelete ? 'restore' : 'delete',
        })}
      >
        {isForDelete ? 'Restore' : 'Delete'}
      </button>
    </div>
  );
};
