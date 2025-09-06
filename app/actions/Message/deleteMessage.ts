'use server';
import { connectDB } from '@/config/database';
import { getSessionUser } from '@/utils/getSessionUser';
import MessageModel from '@/models/Message';
import { revalidatePath } from 'next/cache';

export async function deleteMessage(id: string) {
  const session = await getSessionUser();

  if (!session || !session.userId) {
    throw new Error('Unauthorized');
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

  await message.deleteOne();
  revalidatePath('/messages', 'page');
}
