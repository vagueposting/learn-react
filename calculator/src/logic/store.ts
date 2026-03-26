import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { calcFn } from "./calcFn";
import type { CalculatorState } from "../types";

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
