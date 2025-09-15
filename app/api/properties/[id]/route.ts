import { connectDB } from '@/config/database';
import { PropertyModel } from '@/models/Property';
import { type Property as PropertyType } from '@/types/property';
import { isValidObjectId } from 'mongoose';
import { NextResponse } from 'next/server';

interface Params {
  params: {
    id: string;
  };
}

export const GET = async (request: Request, { params }: Params) => {
  const notFound = new Response('Not found', { status: 404 });
  if (!isValidObjectId(params.id)) {
    return notFound;
  }
  try {
    await connectDB();
    const property = await PropertyModel.findById(params.id);

    if (property === null) {
      return notFound;
    }

    return new NextResponse<PropertyType[]>(JSON.stringify(property), {
      status: 200,
    });
  } catch (e) {
    return new NextResponse('Error', { status: 500 });
  }
};
