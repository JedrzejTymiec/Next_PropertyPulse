import { generateAltText } from '@/utils/generateAltText';
import Image from 'next/image';

interface PropertyHeaderImageProps {
  image: string;
  city: string;
  type: string;
}

export const PropertyHeaderImage = ({ image, city, type }: PropertyHeaderImageProps) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt={generateAltText(city, type)}
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
};
