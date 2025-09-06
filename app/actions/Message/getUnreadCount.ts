'use server';
import { connectDB } from '@/config/database';
import MessageModel from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export async function getUnreadCount(): Promise<number> {
  const session = await getSessionUser();

  if (!session || !session.userId) {
    throw new Error('Unauthorized');
  }

  const { userId } = session;
  await connectDB();
  const unreadCount = await MessageModel.countDocuments({
    recipient: userId,
    read: false,
  });
  return unreadCount;
}
