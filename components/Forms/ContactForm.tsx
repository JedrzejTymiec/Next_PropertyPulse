'use client';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { addMessage } from '@/app/actions/Message/addMessage';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';
import { SubmitButton } from './components/SubmitButton';

interface ContactFormProps {
  ownerId: string;
  propertyId: string;
}

export interface State {
  submitted: boolean;
}

export const ContactForm = ({ propertyId, ownerId }: ContactFormProps) => {
  const { isAuthenticated, userId } = useIsAuthenticated();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const isVisible = isAuthenticated && userId !== ownerId;

  const handleFromSubmit = useCallback(async (formData: FormData) => {
    try {
      const { submitted } = await addMessage(formData);
      setIsSubmitted(submitted);
      toast.success('Message sent');
    } catch (e) {
      toast.error((e as Error).message);
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  if (isSubmitted) {
    return <p className="text-green-500 mb-4">Message sent</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form action={handleFromSubmit}>
        <input
          type="hidden"
          id="property"
          name="property"
          defaultValue={propertyId}
        />
        <input
          type="hidden"
          id="recipient"
          name="recipient"
          defaultValue={ownerId}
        />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
            id="message"
            name="message"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};
