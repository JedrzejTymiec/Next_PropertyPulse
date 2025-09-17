'use server';
import { connectDB, getSessionUser } from '@/lib';
import { Entity } from '@/constants/Entity';
import { paths } from '@/constants/paths';
import { NotFoundException } from '@/exceptions/NotFoundException';
import { UnauthorizedException } from '@/exceptions/UnauthorizedException';
import { MessageModel } from '@/models';
import { assertUser } from '@/utils/asserts/assertUser';
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
  revalidatePath(paths.messages, 'page');

  return message.read;
}
