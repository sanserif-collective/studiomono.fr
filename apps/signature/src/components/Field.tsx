import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export default function Field({ name, ...rest }: Props) {
  return (
    <fieldset>
      <label htmlFor={name}>{name}&nbsp;:</label>
      <input id={name} name={name} {...rest} />
    </fieldset>
  );
}
