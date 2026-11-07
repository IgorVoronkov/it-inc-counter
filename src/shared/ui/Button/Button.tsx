import type { MouseEventHandler, ReactNode } from "react";

import styles from "./Button.module.css";

type ButtonVariant = "accent" | "muted";

type ButtonProps = {
  children: ReactNode;
  variant: ButtonVariant;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

function Button({ children, variant, disabled = false, onClick, className }: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export { Button };
export type { ButtonProps, ButtonVariant };
