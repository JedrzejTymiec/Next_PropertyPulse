import { connectDB, getSessionUser } from '@/lib';
import { MessageModel } from '@/models/';
import '@/models/Property';
import { type PopulatedMessage } from '@/types/message';
import { convertToSerializableObject } from '@/utils';
import { MessageCard } from '@/components/MessageCard';
import { assertUser } from '@/utils/asserts/assertUser';

const MessagesPage = async () => {
  const session = await getSessionUser();
  assertUser(session);
  await connectDB();
  const { userId } = session;
  const messagesDoc = await MessageModel.find({
    recipient: userId,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();
  const unreadMessages = messagesDoc.filter(message => message.read === false);
  const readMessages = messagesDoc.filter(message => message.read === true);
  const messages = convertToSerializableObject<PopulatedMessage[]>([
    ...unreadMessages,
    ...readMessages,
  ]);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>Tou have no messages</p>
            ) : (
              messages.map(message => <MessageCard key={message._id} message={message} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
