import { useCallback, type Dispatch, type SetStateAction } from 'react';
import { ImagePreview } from './ImagePreview';

interface EditImagesProps {
  images: string[];
  imagesToDelete: string[];
  setImagesToDelete: Dispatch<SetStateAction<string[]>>;
  city: string;
  type: string;
}

export const EditImages = ({
  images,
  city,
  type,
  imagesToDelete,
  setImagesToDelete,
}: EditImagesProps) => {
  const handleDelete = useCallback(
    (image: string) => {
      setImagesToDelete(prev => [...prev, image]);
    },
    [setImagesToDelete],
  );

  const handleRestore = useCallback(
    (image: string) => {
      setImagesToDelete(prev => prev.filter(img => img !== image));
    },
    [setImagesToDelete],
  );

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {images.map(image => (
        <ImagePreview
          key={image}
          image={image}
          isForDelete={imagesToDelete.includes(image)}
          city={city}
          type={type}
          onDelete={handleDelete}
          onRestore={handleRestore}
        />
      ))}
    </div>
  );
};
