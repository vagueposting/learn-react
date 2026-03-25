import { create } from 'zustand';
import { calcFn } from './calcFn';

interface CalculatorState {
    a: number;
    b: number;
    result: number;
    setA: (value: number) => void;
    setB: (value: number) => void;
    calculate: (operation: keyof typeof calcFn) => void;
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
    a: 0,
    b: 0,
    result: 0,
    setA: (a) => set({ a }),
    setB: (b) => set({ b }),
    calculate: (operation) => {
        const { a, b } = get();
        const result = calcFn[operation](a, b);
        set({ result })
    }
}));