import { CalculatorButton } from "./calcButton";
import { CalculatorScreen } from "./calcScreen";
interface ControlButton {
  name: string;
  key: string;
  rowClass?: string;
}

export function CalculatorBoard() {
  return (
    <div className='w-4/12 h-5/6 grid grid-cols-4 grid-rows-5 bg-blue-950 text-white p-4 rounded-md gap-3'>
      <CalculatorScreen extraClasses='col-start-1 col-end-5' />
      <CalculatorNumbers />
      <CalculatorControls />
    </div>
  );
}

function CalculatorNumbers() {
  const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div
      className='col-start-1 col-end-4
            row-start-2 row-end-6 grid grid-rows-3
            grid-cols-3 gap-3'
    >
      {numberPad.map((n) => (
        <CalculatorButton text={n.toString()} />
      ))}
    </div>
  );
}

function CalculatorControls() {
  const controls: ControlButton[] = [
    {
      name: "C",
      key: "controls",
    },
    {
      name: "+",
      key: "add",
    },
    {
      name: "-",
      key: "subtract",
    },
    {
      name: "×",
      key: "multiply",
    },
    {
      name: "÷",
      key: "divide",
    },
    {
      name: "=",
      key: "equals",
      rowClass: "row-start-6 row-end-8",
    },
  ];

  return (
    <div
      className='col-start-4 col-end-5
            row-start-2 row-end-6 grid grid-rows-7 gap-2'
    >
      {controls.map((c) => {
        return (
          <>
            <CalculatorButton
              text={c.name}
              key={c.key}
              type='CONTROL'
              extraClasses={c.rowClass}
            />
          </>
        );
      })}
    </div>
  );
}
