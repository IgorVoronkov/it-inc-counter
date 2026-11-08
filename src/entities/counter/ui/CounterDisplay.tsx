import { clsx } from "clsx";

import type { DisplayState } from "../model/types.ts";

import styles from "./CounterDisplay.module.css";

type CounterDisplayProps = {
  display: DisplayState;
};

export function CounterDisplay({ display }: CounterDisplayProps) {
  return (
    <div className={styles.display}>
      {display.kind === "value" && (
        <span className={clsx(styles.value, display.atMax && styles.atMax)}>{display.value}</span>
      )}
      {display.kind === "prompt" && (
        <span className={styles.prompt}>enter values and press 'set'</span>
      )}
      {display.kind === "invalid" && <span className={styles.invalid}>Incorrect value!</span>}
    </div>
  );
}
