import { Button, Panel } from "@/shared/ui";

import styles from "./CounterControls.module.css";

type CounterControlsProps = {
  canIncrement: boolean;
  canReset: boolean;
  onIncrement: () => void;
  onReset: () => void;
};

export function CounterControls({
  canIncrement,
  canReset,
  onIncrement,
  onReset,
}: CounterControlsProps) {
  return (
    <Panel className={styles.actions}>
      <Button variant="accent" disabled={!canIncrement} onClick={onIncrement}>
        inc
      </Button>
      <Button variant="accent" disabled={!canReset} onClick={onReset}>
        reset
      </Button>
    </Panel>
  );
}
