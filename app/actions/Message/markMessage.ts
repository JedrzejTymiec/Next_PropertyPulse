'use server';
import { connectDB } from '@/config/database';
import { Entity } from '@/constants/Entity';
import { NotFoundException } from '@/exceptions/NotFoundException';
import { UnauthorizedException } from '@/exceptions/UnauthorizedException';
import MessageModel from '@/models/Message';
import { assertUser } from '@/utils/asserts/assertUser';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

export async function toggleMessageRead(id: string) {
  const session = await getSessionUser();
  assertUser(session);
  await connectDB();
  const { userId } = session;
  const message = await MessageModel.findById(id);

  if (message === null) {
    throw new NotFoundException(Entity.Message);
  }
  if (message.recipient.toString() !== userId) {
    throw new UnauthorizedException();
  }

  message.read = !message.read;
  await message.save();
  revalidatePath('/messages', 'page');

  return message.read;
}
