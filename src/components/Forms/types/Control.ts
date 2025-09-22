import { type ChangeEvent } from 'react';

interface Controlled<E> {
  value: string | number;
  onChange: (e: ChangeEvent<E>) => void;
  initialValue?: never;
}

interface Uncontrolled {
  value?: never;
  onChange?: never;
  initialValue?: string | number;
}

export type Control<E> = Uncontrolled | Controlled<E>;
