'use client';
import { toggleMessageRead } from '@/app/actions/markMessage';
import { PopulatedMessage } from '@/types/message';
import { useCallback, useState } from 'react';

interface MessageCardProps {
  message: PopulatedMessage;
}

export const MessageCard = ({ message }: MessageCardProps) => {
  const [isRead, setIsRead] = useState<boolean>(message.read);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const recived = new Date(message.createdAt).toLocaleString();

  const handleSetRead = useCallback(async () => {
    setIsLoading(true);
    try {
      const read = await toggleMessageRead(message._id);
      setIsRead(read);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [message]);

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
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
          <strong className="mr-2">Recived:</strong>
          {recived}
        </li>
      </ul>
      <button
        onClick={handleSetRead}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        {isLoading ? 'Loading...' : isRead ? 'Mark as unread' : 'Mark as read'}
      </button>
      <button className="mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md">
        Delete
      </button>
    </div>
  );
};
