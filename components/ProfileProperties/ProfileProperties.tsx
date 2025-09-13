'use client';
import { type Property } from '@/types/property';
import { useCallback, useState } from 'react';
import { deleteProperty as deletePropertyAction } from '@/app/actions/Property/deleteProperty';
import { toast } from 'react-toastify';
import { ProfileProperty } from './ProfileProperty';
import { confirmDelete } from '@/utils/confirmDelete';
import { Entity } from '@/constants/Entity';

interface ProfilePropertiesProps {
  initalProperties: Property[];
}

export const ProfileProperties = ({ initalProperties }: ProfilePropertiesProps) => {
  const [properties, setProperties] = useState<Property[]>(initalProperties);

  const deleteProperty = useCallback(
    async (id: string) => {
      confirmDelete(Entity.Property);
      await deletePropertyAction(id);
      const updatedProperties = properties.filter(property => property._id !== id);
      setProperties(updatedProperties);
      toast.success('Property deleted');
    },
    [properties],
  );

  return properties.map(property => (
    <ProfileProperty key={property._id} property={property} deleteProperty={deleteProperty} />
  ));
};
