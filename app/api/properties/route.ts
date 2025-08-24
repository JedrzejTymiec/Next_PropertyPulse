import { connectDB } from '@/config/database';
import Property from '@/models/Property';
import { Property as PropertyType } from '@/types/property';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectDB();
    const properties = await Property.find({});
    return new NextResponse<PropertyType[]>(JSON.stringify(properties), {
      status: 200,
    });
  } catch (e) {
    return new NextResponse('Error', { status: 500 });
  }
};
