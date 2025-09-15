import { connectDB } from '@/config/database';
import { PropertyModel } from '@/models/Property';
import { type Property as PropertyType } from '@/types/property';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectDB();
    const properties = await PropertyModel.find({});
    return new NextResponse<PropertyType[]>(JSON.stringify(properties), {
      status: 200,
    });
  } catch (e) {
    return new NextResponse('Error', { status: 500 });
  }
};
