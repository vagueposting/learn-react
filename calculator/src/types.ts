import { calcFn } from "./logic/calcFn";

export interface ContainerChildren {
  children: React.ReactNode;
}

export type extraClasses = string;

export type buttonType = "NUMBER" | "CONTROL";

export interface numberCollector {
  collectorFn: (num: number) => void;
}

export interface inputCollector {
  collectorFn: (op: "add" | "subtract" | "multiply" | "divide" | null) => void;
}

export interface CalculatorState {
  a: number;
  b: number;
  operation: null | "add" | "subtract" | "multiply" | "divide" | "equals";
  result: number;
  setA: (value: number) => void;
  setB: (value: number) => void;
  calculate: (operation: keyof typeof calcFn) => void;
}
