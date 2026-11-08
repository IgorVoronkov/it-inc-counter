import type { CounterSettings } from "./types.ts";

const STORAGE_KEY = "counter:settings";

const DEFAULT_SETTINGS: CounterSettings = Object.freeze({ start: 0, max: 5 });

function isCounterSettings(value: unknown): value is CounterSettings {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const { start, max } = value as Record<string, unknown>;

  return (
    typeof start === "number" &&
    typeof max === "number" &&
    Number.isInteger(start) &&
    Number.isInteger(max) &&
    start >= 0 &&
    max > start
  );
}

export function loadSettings(): CounterSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw === null) {
      return DEFAULT_SETTINGS;
    }

    const parsed: unknown = JSON.parse(raw);

    return isCounterSettings(parsed) ? parsed : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: CounterSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage can be unavailable (private mode) or full (quota); the UI must keep working.
  }
}
