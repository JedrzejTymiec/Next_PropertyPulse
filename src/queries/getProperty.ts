import { PropertyModel } from '@/models';
import { connectDB } from '@/lib';
import { CacheTag } from '@/constants/CacheTag';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import { cacheLife } from 'next/dist/server/use-cache/cache-life';

export const getProperty = async (id: string) => {
  'use cache';
  cacheTag(`${CacheTag.Property}:${id}`);
  cacheLife('days');
  await connectDB();
  return await PropertyModel.findById(id).lean();
};
