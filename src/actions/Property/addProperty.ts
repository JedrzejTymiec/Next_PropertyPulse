'use server';
import { connectDB, getSessionUser, cloudinaryClient } from '@/lib';
import { PropertyModel } from '@/models';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { assertUser } from '@/utils/asserts/assertUser';
import { CacheTag } from '@/constants/CacheTag';

export async function addProperty(formData: FormData) {
  const sessionUser = await getSessionUser();
  assertUser(sessionUser);
  await connectDB();
  const { userId } = sessionUser;

  const propertyData = {
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
    images: [''],
  };

  const imageUrls = [];
  const images = (formData.getAll('images') as File[]).filter(image => image.name !== '');

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    //Convert to base64
    const imageBase64 = imageData.toString('base64');

    const result = await cloudinaryClient.uploader.upload(`data:image/png;base64,${imageBase64}`, {
      folder: 'propertypulse',
    });

    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls;

  const newProperty = new PropertyModel(propertyData);
  await newProperty.save();

  revalidateTag(CacheTag.Properties);

  redirect(`/properties/${newProperty._id}`);
}
