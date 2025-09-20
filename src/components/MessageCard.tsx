'use client';
import { deleteMessage } from '@/actions/Message/deleteMessage';
import { toggleMessageRead } from '@/actions/Message/markMessage';
import { Entity } from '@/constants/Entity';
import { useMessagesContext } from '@/context/MessagesContext';
import { type PopulatedMessage } from '@/types/message';
import { confirmDelete } from '@/utils/confirmDelete';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Spinner } from '@/components/Spinner';

interface MessageCardProps {
  message: PopulatedMessage;
}

export const MessageCard = ({ message }: MessageCardProps) => {
  const [isRead, setIsRead] = useState<boolean>(message.read);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUnreadCount } = useMessagesContext();
  const received = new Date(message.createdAt).toLocaleString();

  const handleSetRead = useCallback(async () => {
    setIsLoading(true);
    try {
      const read = await toggleMessageRead(message._id);
      setIsRead(read);
      setUnreadCount(prev => (read ? prev - 1 : prev + 1));
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [message, setUnreadCount]);

  const handleDeleteMessage = useCallback(async () => {
    confirmDelete(Entity.Message);
    await deleteMessage(message._id);
    toast.success('Message deleted');
  }, [message._id]);

  return (
    <article className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead ? (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      ) : null}
      <h2 className="text-xl mb-4">
        <span className="font-bold mr-2">Property Inquiry:</span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong className="mr-2">Reply Email:</strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong className="mr-2">Reply Phone:</strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong className="mr-2">Received:</strong>
          {received}
        </li>
      </ul>
      <button
        onClick={handleSetRead}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
        disabled={isLoading}
        aria-live="polite"
      >
        {isLoading ? (
          <Spinner size={12} margin="0px 5px 0px 0px" display="inline-block" color="#FFF" />
        ) : null}
        {isRead ? 'Mark as unread' : 'Mark as read'}
      </button>
      <button
        aria-label={`Delete message from ${message.email} regarding ${message.property.name}`}
        onClick={handleDeleteMessage}
        className="mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </article>
  );
};
