'use server';
import { connectDB } from '@/config/database';
import { getSessionUser } from '@/utils/getSessionUser';
import { MessageModel } from '@/models/Message';
import { revalidatePath } from 'next/cache';
import { assertUser } from '@/utils/asserts/assertUser';
import { UnauthorizedException } from '@/exceptions/UnauthorizedException';
import { NotFoundException } from '@/exceptions/NotFoundException';
import { Entity } from '@/constants/Entity';

export async function deleteMessage(id: string) {
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

  await message.deleteOne();
  revalidatePath('/messages', 'page');
}
