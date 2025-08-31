import { isOddAndLast } from '@/utils/isOddAndLast';
import Image from 'next/image';

interface GalleryProps {
  images: string[];
}

//TODO: alt texts

export const Gallery = ({ images }: GalleryProps) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={image}
                className={
                  isOddAndLast(index, images.length)
                    ? 'col-span-2'
                    : 'col-span-1'
                }
              >
                <Image
                  src={image}
                  alt=""
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={1800}
                  height={400}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
