interface MathOperation {
    (a: number, b: number): number;
};

export const calcFn = {
    add: ((a, b) => a + b) as MathOperation,
    subtract: ((a, b) => a - b) as MathOperation,
    multiply: ((a, b) => a * b) as MathOperation,
    divide: ((a, b) => {
        if (b === 0) {
            return NaN
        }

        return a / b;
    }) as MathOperation
};