'use server';
import { connectDB } from '@/config/database';
import MessageModel from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export async function addMessage(formData: FormData) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User id required');
  }

  await connectDB();
  const { userId } = sessionUser;

  const recipient = formData.get('recipient');
  if (userId === recipient) {
    throw new Error('You cannot send message to yourself');
  }

  const newMessage = new MessageModel({
    sender: userId,
    recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('message'),
  });

  await newMessage.save();

  return { submitted: true };
}
