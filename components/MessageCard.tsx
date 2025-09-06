import { PopulatedMessage } from '@/types/message';

interface MessageCardProps {
  message: PopulatedMessage;
}

export const MessageCard = ({ message }: MessageCardProps) => {
  const recived = new Date(message.createdAt).toLocaleString();
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
      <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md">
        Mark as read
      </button>
      <button className="mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md">
        Delete
      </button>
    </div>
  );
};
