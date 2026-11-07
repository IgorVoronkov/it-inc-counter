import type { ReactNode } from "react";

import styles from "./Panel.module.css";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

function Panel({ children, className }: PanelProps) {
  return (
    <div className={className ? `${styles.panel} ${className}` : styles.panel}>{children}</div>
  );
}

export { Panel };
export type { PanelProps };
