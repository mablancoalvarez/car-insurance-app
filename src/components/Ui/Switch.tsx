import type { ChangeEvent, ReactNode } from 'react';

type SwitchProps = {
  id: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  checked: boolean;
  label?: ReactNode;
  /** Accepted for call sites; the input is always a checkbox. */
  type?: string;
};

const Switch = ({ id, name, onChange, value, checked, label }: SwitchProps) => {
  return (
    <label htmlFor={id} className="checkbox-label">
      <input
        type="checkbox"
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        checked={checked}
      />
      <span className="slider round"></span>
      {label}
    </label>
  );
};

export default Switch;
