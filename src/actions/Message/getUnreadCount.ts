'use server';
import { connectDB, getSessionUser } from '@/lib';
import { MessageModel } from '@/models';
import { assertUser } from '@/utils/asserts/assertUser';

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
