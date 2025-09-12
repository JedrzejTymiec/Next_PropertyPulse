import Link from 'next/link';
import Image from 'next/image';
import { paths } from '@/constants/paths';
import { type Property } from '@/types/property';
import { useCallback } from 'react';

interface ProfilePropertyProps {
  property: Property;
  deleteProperty: (id: string) => Promise<void>;
}

export const ProfileProperty = ({ property, deleteProperty }: ProfilePropertyProps) => {
  const handleDeleteProperty = useCallback(async () => {
    await deleteProperty(property._id);
  }, [deleteProperty, property]);

  return (
    <div key={property._id} className="mb-10">
      <Link href={paths.property.replace(':id', property._id)}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          width={1000}
          height={200}
          alt="Property 1"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street} {property.location.city} {property.location.state}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={paths.editProperty.replace(':id', property._id)}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          onClick={handleDeleteProperty}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
