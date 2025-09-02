'use server';

import cloudinary from '@/config/cloudinary';
import { connectDB } from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

export async function deleteProperty(id: string) {
  const sessionUser = await getSessionUser();

  if (sessionUser === null || !sessionUser.userId) {
    throw new Error('User cannot be null');
  }

  await connectDB();
  const { userId } = sessionUser;
  const property = await Property.findById(id);

  if (property === null) {
    throw new Error('Property not found');
  }

  if (property.owner.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  const publicIds = property.images.map((imageUrl) => {
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
