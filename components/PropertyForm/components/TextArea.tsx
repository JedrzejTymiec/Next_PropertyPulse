import { ChangeEvent, useCallback, useState } from 'react';

interface TextAreaProps {
  label: string;
  id: string;
  placeholder: string;
  rows: number;
  initialValue?: string;
}

export const TextArea = ({
  label,
  id,
  placeholder,
  rows,
  initialValue,
}: TextAreaProps) => {
  const [value, setValue] = useState<string>('');

  const handleOnChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setValue(e.currentTarget.value);
  }, []);

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={handleOnChange}
        id={id}
        name={id}
        className="border rounded w-full py-2 px-3"
        rows={rows}
        placeholder={placeholder}
        defaultValue={initialValue}
      ></textarea>
    </div>
  );
};
