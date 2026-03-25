interface CalcButt {
    num: number;
    type: 'NUMBER' | 'CONTROL'
}

export function CalculatorButton({ num, type }: CalcButt) {
    return (
        <button className={`${type} cursor-pointer bg-cyan-700 p-2`}>
            {num}
        </button>
    )
}