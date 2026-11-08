import { clsx } from "clsx";

import styles from "./TextField.module.css";

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  className?: string;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  invalid = false,
  className,
}: TextFieldProps) {
  return (
    <div className={clsx(styles.field, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={clsx(styles.input, invalid && styles.invalid)}
        type="number"
        step={1}
        inputMode="numeric"
        autoComplete="off"
        value={value}
        aria-invalid={invalid}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
    </div>
  );
}
