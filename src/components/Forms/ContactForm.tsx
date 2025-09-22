'use client';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { addMessage } from '@/actions/Message/addMessage';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';
import { SubmitButton } from '@/components/Forms/components/SubmitButton';
import { Input } from '@/components/Forms/components/Input';
import { TextArea } from '@/components/Forms/components/TextArea';

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
    return (
      <p role="status" className="text-green-500 mb-4">
        Message sent
      </p>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form action={handleFromSubmit}>
        <input type="hidden" id="property" name="property" defaultValue={propertyId} />
        <input type="hidden" id="recipient" name="recipient" defaultValue={ownerId} />
        <Input
          type="text"
          id="name"
          placeholder="Enter your name"
          required={true}
          variant="contact"
          className="mb-4"
          label={{ text: 'Name:' }}
        />
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          required={true}
          variant="contact"
          className="mb-4"
          label={{ text: 'Email:' }}
        />
        <Input
          type="text"
          id="phone"
          placeholder="Enter your phone number"
          variant="contact"
          className="mb-4"
          label={{ text: 'Phone:' }}
        />
        <TextArea
          id="message"
          variant="contact"
          placeholder="Enter your message"
          label="Message:"
          rows={5}
        />
        <SubmitButton />
      </form>
    </div>
  );
};
