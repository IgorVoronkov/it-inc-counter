import { Button, Panel, TextField } from "@/shared/ui";

import styles from "./CounterSettings.module.css";

type CounterSettingsProps = {
  start: string;
  max: string;
  startInvalid: boolean;
  maxInvalid: boolean;
  canApply: boolean;
  onStartChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  onApply: () => void;
};

export function CounterSettings({
  start,
  max,
  startInvalid,
  maxInvalid,
  canApply,
  onStartChange,
  onMaxChange,
  onApply,
}: CounterSettingsProps) {
  return (
    <>
      <Panel className={styles.group}>
        <TextField
          id="counter-max"
          label="max value:"
          value={max}
          invalid={maxInvalid}
          onChange={onMaxChange}
        />
        <TextField
          id="counter-start"
          label="start value:"
          value={start}
          invalid={startInvalid}
          onChange={onStartChange}
        />
      </Panel>
      <Panel className={styles.actions}>
        <Button variant={canApply ? "accent" : "muted"} disabled={!canApply} onClick={onApply}>
          set
        </Button>
      </Panel>
    </>
  );
}
