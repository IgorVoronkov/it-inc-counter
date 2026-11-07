import { clsx } from "clsx";
import type { ReactNode } from "react";

import styles from "./Panel.module.css";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className }: PanelProps) {
  return <div className={clsx(styles.panel, className)}>{children}</div>;
}
