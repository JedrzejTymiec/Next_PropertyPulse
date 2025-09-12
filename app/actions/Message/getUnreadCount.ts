'use server';
import { connectDB } from '@/config/database';
import MessageModel from '@/models/Message';
import { assertUser } from '@/utils/asserts/assertUser';
import { getSessionUser } from '@/utils/getSessionUser';

export async function getUnreadCount(): Promise<number> {
  const session = await getSessionUser();
  assertUser(session);
  const { userId } = session;
  await connectDB();
  const unreadCount = await MessageModel.countDocuments({
    recipient: userId,
    read: false,
  });

  return unreadCount;
}
