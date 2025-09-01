'use client';
import { Property } from '@/types/property';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { paths } from '@/constants/paths';

interface ProfilePropertiesProps {
  initalProperties: Property[];
}

export const ProfileProperties = ({
  initalProperties,
}: ProfilePropertiesProps) => {
  const [properties, setProperties] = useState<Property[]>(initalProperties);
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
        <p className="text-lg font-semibold">Property Title 1</p>
        <p className="text-gray-600">Address: 123 Main St</p>
      </div>
      <div className="mt-2">
        <Link
          href={paths.addProperty}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  ));
};
