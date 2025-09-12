'use server';
import cloudinary from '@/config/cloudinary';
import { connectDB } from '@/config/database';
import { NotFoundEntity } from '@/exceptions/NotFoundEntities';
import { NotFoundException } from '@/exceptions/NotFoundException';
import { UnauthorizedException } from '@/exceptions/UnauthorizedException';
import Property from '@/models/Property';
import { assertUser } from '@/utils/asserts/assertUser';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

export async function deleteProperty(id: string) {
  const sessionUser = await getSessionUser();
  assertUser(sessionUser);
  await connectDB();
  const { userId } = sessionUser;
  const property = await Property.findById(id);

  if (property === null) {
    throw new NotFoundException(NotFoundEntity.Property);
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
      await cloudinary.uploader.destroy('propertypulse/' + publicId);
    }
  }

  await property.deleteOne();
  revalidatePath('/', 'layout');
}
