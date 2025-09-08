'use client';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { FaGoogle } from 'react-icons/fa';

interface LogInButtonProps {
  id: string;
}

export const LogInButton = ({ id }: LogInButtonProps) => {
  const handleSignIn = useCallback(() => {
    signIn(id);
  }, [id]);

  return (
    <button
      key={id}
      onClick={handleSignIn}
      className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
    >
      <FaGoogle className="text-white mr-2" />
      <span>Login or Register</span>
    </button>
  );
};
