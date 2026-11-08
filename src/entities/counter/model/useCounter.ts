import { useState } from "react";

import { loadSettings, saveSettings } from "./storage.ts";
import type { CounterDraft, CounterSettings, DisplayState } from "./types.ts";

function parseInteger(value: string): number | null {
  if (value.trim() === "") {
    return null;
  }

  const parsed = Number(value);

  return Number.isInteger(parsed) ? parsed : null;
}

export function useCounter() {
  const [applied, setApplied] = useState<CounterSettings>(loadSettings);
  const [value, setValue] = useState(applied.start);
  const [draft, setDraft] = useState<CounterDraft>({
    start: String(applied.start),
    max: String(applied.max),
  });

  const draftStart = parseInteger(draft.start);
  const draftMax = parseInteger(draft.max);

  const startInvalid = draftStart === null || draftStart < 0;
  const maxInvalid =
    draftMax === null || (draftStart !== null && draftStart >= 0 && draftMax <= draftStart);
  const isValid = !startInvalid && !maxInvalid;
  const isEditing = draft.start !== String(applied.start) || draft.max !== String(applied.max);
  const canApply = isValid && isEditing;

  const display: DisplayState = !isValid
    ? { kind: "invalid" }
    : isEditing
      ? { kind: "prompt" }
      : { kind: "value", value, atMax: value === applied.max };

  function setStart(next: string) {
    setDraft((current) => ({ ...current, start: next }));
  }

  function setMax(next: string) {
    setDraft((current) => ({ ...current, max: next }));
  }

  function apply() {
    if (!canApply || draftStart === null || draftMax === null) {
      return;
    }

    const next: CounterSettings = { start: draftStart, max: draftMax };

    setApplied(next);
    setValue(next.start);
    setDraft({ start: String(next.start), max: String(next.max) });
    saveSettings(next);
  }

  function increment() {
    if (isEditing || value >= applied.max) {
      return;
    }

    setValue(value + 1);
  }

  function reset() {
    if (isEditing) {
      return;
    }

    setValue(applied.start);
  }

  return {
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
  };
}
