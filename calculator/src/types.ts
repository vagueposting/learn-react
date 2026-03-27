import { calcFn } from "./logic/calcFn";

export interface ContainerChildren {
  children: React.ReactNode;
}

export type extraClasses = string;

export type buttonType = "NUMBER" | "CONTROL";

export interface numberCollector {
  collectorFn: (num: number) => void;
  resetKey: number;
}

export type CalculatorAction =
  | "add"
  | "subtract"
  | "multiply"
  | "divide"
  | "equals"
  | null;

export interface inputCollector {
  collectorFn: (op: CalculatorAction) => void;
}

export interface CalculatorState {
  a: number;
  b: number;
  operation: null | "add" | "subtract" | "multiply" | "divide";
  result: number;
  setA: (value: number) => void;
  setB: (value: number) => void;
  setOperation: (op: CalculatorState["operation"]) => void;
  calculate: (operation: keyof typeof calcFn) => void;
}
