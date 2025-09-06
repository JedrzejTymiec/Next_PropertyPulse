'use server';
import { connectDB } from '@/config/database';
import MessageModel from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

export async function toggleMessageRead(id: string) {
  const session = await getSessionUser();

  if (!session || !session.userId) {
    throw new Error('Unathorized');
  }

  await connectDB();
  const { userId } = session;
  const message = await MessageModel.findById(id);

  if (message === null) {
    throw new Error('Message not found');
  }
  if (message.recipient.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  message.read = !message.read;
  await message.save();
  revalidatePath('/messages', 'page');

  return message.read;
}
