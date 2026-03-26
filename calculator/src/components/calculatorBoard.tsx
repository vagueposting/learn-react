import { useCalculatorStore } from "../logic/store";
import { useImmer } from "use-immer";
import { CalculatorButton } from "./calcButton";
import { CalculatorScreen } from "./calcScreen";
import type {
  CalculatorState,
  inputCollector,
  numberCollector,
} from "../types";

interface ControlButton {
  name: string;
  key: string;
  rowClass?: string;
}

export function CalculatorBoard() {
  const { a, b, operation, result, setA, setB, setOperation, calculate } =
    useCalculatorStore();
  const [currentNumber, setCurrentNumber] = useImmer(0);

  function getDigits(data: number): void {
    setCurrentNumber(data); // this just gets the current number on display
  }

  function getOperation(data: CalculatorState["operation"]): void {
    setOperation(data);
    // if a is 0, set number to a
    // otherwise, don't do anything
    if (a === 0) {
      setA(currentNumber);
      setCurrentNumber(0);
    }
  }

  return (
    <div className='md:w-4/12 h-5/6 grid grid-cols-4 grid-rows-5 bg-linear-to-br from-mist-600 via-neutral-500 to-neutral-400 shadow-2xl text-white p-4 rounded-md gap-3'>
      <CalculatorScreen
        extraClasses='col-start-1 col-end-5'
        value={currentNumber ? currentNumber : 0}
        operation={operation}
      />
      <CalculatorNumbers collectorFn={getDigits} />
      <CalculatorControls collectorFn={getOperation} />
    </div>
  );
}

function CalculatorNumbers({ collectorFn }: numberCollector) {
  const [digits, setDigit] = useImmer<number[]>([0]);

  function handleDigits(num: number) {
    setDigit((draft) => {
      draft.push(num);
    });
    // send up the digits to CalculatorBoard()
    collectorFn(Number(digits.join("")));
  }

  const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div
      className='col-start-1 col-end-4
            row-start-2 row-end-6 grid grid-rows-3
            grid-cols-3 gap-3'
    >
      {numberPad.map((n: number) => (
        <CalculatorButton
          key={n}
          text={n.toString()}
          clickFn={(n: number) => handleDigits(n)}
        />
      ))}
    </div>
  );
}

function CalculatorControls({ collectorFn }: inputCollector) {
  const controls: ControlButton[] = [
    {
      name: "C",
      key: "clear",
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

  const opMap: Record<
    string,
    "add" | "subtract" | "multiply" | "divide" | null
  > = {
    "+": "add",
    "-": "subtract",
    "×": "multiply",
    "÷": "divide",
    C: null,
    "=": null,
  };

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
              clickFn={() => collectorFn(opMap[c.name])}
            />
          </>
        );
      })}
    </div>
  );
}
