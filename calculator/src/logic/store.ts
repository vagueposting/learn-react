import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { calcFn } from "./calcFn";

interface CalculatorState {
  a: number;
  b: number;
  operation: null | "add" | "subtract" | "multiply" | "divide";
  result: number;
  setA: (value: number) => void;
  setB: (value: number) => void;
  calculate: (operation: keyof typeof calcFn) => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  immer((set, get) => ({
    a: 0,
    b: 0,
    operation: null,
    result: 0,
    setA: (a) =>
      set((state) => {
        state.a = a;
      }),
    setB: (b) =>
      set((state) => {
        state.b = b;
      }),
    setOperation: (op: CalculatorState["operation"]) =>
      set((state) => {
        state.operation = op;
      }),
    calculate: (operation) => {
      const { a, b } = get();
      const result = calcFn[operation](a, b);
      set((state) => {
        state.result = result;
      });
    },
  })),
);
