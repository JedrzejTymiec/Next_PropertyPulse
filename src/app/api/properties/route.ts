import { connectDB } from '@/lib/connectDB';
import { type Property as PropertyType } from '@/types/property';
import { getProperties } from '@/queries';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectDB();
    const properties = await getProperties();
    return new NextResponse<PropertyType[]>(JSON.stringify(properties), {
      status: 200,
    });
  } catch (e) {
    return new NextResponse((e as Error).message, { status: 500 });
  }
};
