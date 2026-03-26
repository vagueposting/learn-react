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
    // this just gets the current number on display
    setCurrentNumber(data);
  }

  function getOperation(data: CalculatorState["operation"]): void {
    if (data === null) {
      setA(0);
      setB(0);
      setOperation(null);
      setCurrentNumber(0);
      return;
    }

    if (data === "equals") {
      if (operation !== null && a !== 0) {
        setB(currentNumber);
        const store = useCalculatorStore.getState();
        store.calculate(operation);
        setCurrentNumber(store.result);

        setA(store.result);
        setOperation(null);
        // TODO: Continue this for the love of God...
      }
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
  const [digits, setDigit] = useImmer<number[]>([]);

  function handleDigits(num: number) {
    setDigit((draft) => {
      draft.push(num);
      // send up the digits to CalculatorBoard()
      const newNumber = Number(draft.join(""));
      collectorFn(newNumber);
    });
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
          clickFn={() => handleDigits(n)}
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
    "add" | "subtract" | "multiply" | "divide" | "equals" | null
  > = {
    "+": "add",
    "-": "subtract",
    "×": "multiply",
    "÷": "divide",
    C: null,
    "=": "equals",
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
