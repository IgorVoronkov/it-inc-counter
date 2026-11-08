import { CounterDisplay, useCounter } from "@/entities/counter";
import { CounterControls } from "@/features/counter-controls";
import { CounterSettings } from "@/features/counter-settings";
import { Panel } from "@/shared/ui";

import styles from "./CounterPage.module.css";

export function CounterPage() {
  const {
    applied,
    value,
    draft,
    display,
    canApply,
    startInvalid,
    maxInvalid,
    isEditing,
    setStart,
    setMax,
    apply,
    increment,
    reset,
  } = useCounter();

  const canIncrement = !isEditing && value < applied.max;
  const canReset = !isEditing;

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <Panel className={styles.column}>
          <CounterSettings
            start={draft.start}
            max={draft.max}
            startInvalid={startInvalid}
            maxInvalid={maxInvalid}
            canApply={canApply}
            onStartChange={setStart}
            onMaxChange={setMax}
            onApply={apply}
          />
        </Panel>
        <Panel className={styles.column}>
          <Panel className={styles.display}>
            <CounterDisplay display={display} />
          </Panel>
          <CounterControls
            canIncrement={canIncrement}
            canReset={canReset}
            onIncrement={increment}
            onReset={reset}
          />
        </Panel>
      </div>
    </main>
  );
}
