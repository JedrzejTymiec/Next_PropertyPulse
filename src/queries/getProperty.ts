import { PropertyModel } from '@/models';
import { connectDB } from '@/lib';
import { CacheTag } from '@/constants/CacheTag';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { convertToSerializableObject } from '@/utils';
import { type Property as PropertyType } from '@/types';
import { notFound } from 'next/navigation';

export const getProperty = async (id: string) => {
  'use cache';
  cacheTag(`${CacheTag.Property}:${id}`);
  cacheLife('days');

  await connectDB();
  const propertyDoc = await PropertyModel.findById(id).lean();

  if (propertyDoc === null) {
    notFound();
  }

  return convertToSerializableObject<PropertyType>(propertyDoc);
};
