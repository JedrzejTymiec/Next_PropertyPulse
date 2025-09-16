import { type ChangeEvent, useCallback, useState } from 'react';
import { labelVariants, inputVariants } from './inputVariants';
import { clsx } from 'clsx';

interface Label {
  text: string;
  placement?: 'top' | 'left';
  font?: 'bold' | 'normal';
  color?: 'grey' | 'black';
}

interface InputProps {
  type: HTMLInputElement['type'];
  id: string;
  variant?: 'property' | 'search' | 'contact';
  label?: Label;
  placeholder?: string;
  name?: string;
  required?: boolean;
  className?: string;
  initialValue?: string | number;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  label,
  placeholder,
  id,
  name,
  type,
  required = true,
  className,
  initialValue,
  variant = 'property',
  value: externalValue,
  onChange: externalOnChange,
}: InputProps) => {
  const [value, setValue] = useState<string | number>(initialValue ?? '');
  const isLabelHorizontal = label?.placement === 'left';
  const isFileInput = type === 'file';

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.currentTarget.value);
  }, []);

  return (
    <div className={clsx(className, isLabelHorizontal ? 'flex items-center' : null)}>
      {label ? (
        <label
          htmlFor={id}
          className={labelVariants({
            placement: label.placement,
            font: label.font,
            color: label.color,
          })}
        >
          {label.text}
        </label>
      ) : null}
      <input
        value={externalValue ?? value}
        onChange={externalOnChange ?? handleOnChange}
        type={type}
        id={id}
        name={name ?? id}
        className={inputVariants({ variant })}
        placeholder={placeholder}
        required={required}
        {...(isFileInput ? { accept: 'image/*', multiple: true } : undefined)}
        {...(label ? undefined : { 'aria-label': id })}
      />
    </div>
  );
};
