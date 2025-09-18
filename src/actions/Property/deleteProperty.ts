'use server';
import { connectDB, getSessionUser, cloudinaryClient } from '@/lib';
import { Entity } from '@/constants/Entity';
import { NotFoundException, UnauthorizedException } from '@/exceptions';
import { PropertyModel } from '@/models';
import { assertUser } from '@/utils/asserts/assertUser';
import { revalidateTag } from 'next/cache';
import { CacheTag } from '@/constants/CacheTag';

export async function deleteProperty(id: string) {
  const sessionUser = await getSessionUser();
  assertUser(sessionUser);
  await connectDB();
  const { userId } = sessionUser;
  const property = await PropertyModel.findById(id);

  if (property === null) {
    throw new NotFoundException(Entity.Property);
  }

  if (property.owner.toString() !== userId) {
    throw new UnauthorizedException();
  }

  const publicIds = property.images.map(imageUrl => {
    const parts = imageUrl.split('/');
    return parts.at(-1)?.split('.').at(0);
  });

  if (publicIds.length > 0) {
    for (const publicId of publicIds) {
      await cloudinaryClient.uploader.destroy('propertypulse/' + publicId);
    }
  }

  await property.deleteOne();
  revalidateTag(CacheTag.Properties);
}
