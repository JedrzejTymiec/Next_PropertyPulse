'use client';
import { Property } from '@/types/property';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { paths } from '@/constants/paths';
import { deleteProperty } from '@/app/actions/Property/deleteProperty';
import { toast } from 'react-toastify';

interface ProfilePropertiesProps {
  initalProperties: Property[];
}

export const ProfileProperties = ({
  initalProperties,
}: ProfilePropertiesProps) => {
  const [properties, setProperties] = useState<Property[]>(initalProperties);

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = window.confirm(
        'Are you sure you want to delete this property',
      );

      if (!confirmed) return;

      await deleteProperty(id);

      const updatedProperties = properties.filter(
        (property) => property._id !== id,
      );
      setProperties(updatedProperties);
      toast.success('Property deleted');
    },
    [properties],
  );

  return properties.map((property) => (
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
          Address: {property.location.street} {property.location.city}{' '}
          {property.location.state}
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
          onClick={() => handleDelete(property._id)}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  ));
};
