import { FaTimes } from 'react-icons/fa';

interface RateProps {
  text: string;
  rate?: number;
}

export const Rate = ({ text, rate }: RateProps) => {
  return (
    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
      <div className="text-gray-500 mr-2 font-bold">{text}</div>
      <div className="text-2xl font-bold text-blue-500">
        {rate ? (
          `$${rate.toLocaleString()}`
        ) : (
          <FaTimes className="text-red-700" />
        )}
      </div>
    </div>
  );
};
