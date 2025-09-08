'use server';
import { connectDB } from '@/config/database';
import { paths } from '@/constants/paths';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateProperty(id: string, formData: FormData) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User id equired');
  }

  await connectDB();
  const { userId } = sessionUser;
  const property = await Property.findById(id);

  if (property?.owner.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  const updatedPropertyData = {
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities: formData.getAll('amenities'),
    rates: {
      nightly: formData.get('rates.nightly'),
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
  };

  await Property.findByIdAndUpdate(id, updatedPropertyData);

  revalidatePath('/', 'layout');
  redirect(paths.property.replace(':id', id));
}
