import Link from 'next/link';
import Image from 'next/image';
import { paths } from '@/constants/paths';
import { type Property } from '@/types/property';
import { useCallback } from 'react';
import { createUrl } from '@/utils/createUrl';
import { generateAltText } from '@/utils/generateAltText';

interface ProfilePropertyProps {
  property: Property;
  deleteProperty: (id: string) => Promise<void>;
}

export const ProfileProperty = ({ property, deleteProperty }: ProfilePropertyProps) => {
  const handleDeleteProperty = useCallback(async () => {
    await deleteProperty(property._id);
  }, [deleteProperty, property]);

  return (
    <article className="mb-10">
      <Link href={createUrl(paths.property, { id: property._id })}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          width={1280}
          height={720}
          sizes="(min-width: 768px) 67vw,
          100vw"
          alt={generateAltText(property.location.city, property.type)}
        />
      </Link>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{property.name}</h3>
        <p className="text-gray-600">
          Address: {property.location.street} {property.location.city} {property.location.state}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={createUrl(paths.editProperty, { id: property._id })}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          onClick={handleDeleteProperty}
          type="button"
          aria-label={`Delete property ${property.name}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
};
