export type CounterSettings = {
  start: number;
  max: number;
};

export type CounterDraft = {
  start: string;
  max: string;
};

export type DisplayState =
  | { kind: "value"; value: number; atMax: boolean }
  | { kind: "prompt" }
  | { kind: "invalid" };
