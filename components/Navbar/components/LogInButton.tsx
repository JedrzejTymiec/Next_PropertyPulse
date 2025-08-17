'use client';

import { FaGoogle } from 'react-icons/fa';

interface LogInButtonProps {
  onClick: () => void;
}

export const LogInButton = ({ onClick }: LogInButtonProps) => {
  return (
    <div className="hidden md:block md:ml-6">
      <div className="flex items-center">
        <button
          onClick={onClick}
          className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
        >
          <FaGoogle className="text-white mr-2" />
          <span>Login or Register</span>
        </button>
      </div>
    </div>
  );
};
