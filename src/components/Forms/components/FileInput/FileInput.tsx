import { type ChangeEvent, useCallback } from 'react';
import { type WithLabel } from '@/components/Forms/types/WithLabel';

interface BaseInput {
  id: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  className?: string;
  limit: number;
}

type InputProps = BaseInput & WithLabel;

export const FileInput = ({
  label,
  placeholder,
  id,
  name,
  required = true,
  className,
  ariaLabel,
  limit = 4,
}: InputProps) => {
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if ((e.currentTarget.files?.length ?? 0) > limit) {
        alert(`You can add up to ${limit} images`);
        e.currentTarget.value = '';
        return;
      }
    },
    [limit],
  );

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={id} className="font-bold mb-2 text-gray-700">
          {label.text}
        </label>
      ) : null}
      <input
        onChange={handleOnChange}
        type="file"
        id={id}
        name={name ?? id}
        className="border rounded w-full py-2 px-3"
        placeholder={placeholder}
        required={required}
        aria-required={required}
        accept="image/*"
        multiple
        {...(label ? undefined : { 'aria-label': ariaLabel })}
      />
    </div>
  );
};
