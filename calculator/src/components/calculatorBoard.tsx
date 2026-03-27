import { useEffect } from "react";
import { useCalculatorStore } from "../logic/store";
import { useImmer } from "use-immer";
import { CalculatorButton } from "./calcButton";
import { CalculatorScreen } from "./calcScreen";
import type {
  CalculatorAction,
  inputCollector,
  numberCollector,
} from "../types";

interface ControlButton {
  name: string;
  key: string;
  rowClass?: string;
}

export function CalculatorBoard() {
  const operation = useCalculatorStore((state) => state.operation);
  const [currentNumber, setCurrentNumber] = useImmer(0);
  const [resetKey, setResetKey] = useImmer(0);

  function getDigits(data: number): void {
    // this just gets the current number on display
    setCurrentNumber(data);
  }

  function getOperation(data: CalculatorAction): void {
    if (data === null) {
      const store = useCalculatorStore.getState();
      store.setA(0);
      store.setB(0);
      store.setOperation(null);
      setCurrentNumber(0);
      setResetKey((k) => k + 1);
      return;
    }

    const store = useCalculatorStore.getState();

    if (data === "equals") {
      if (store.operation !== null && store.a !== 0) {
        store.setB(currentNumber);
        store.calculate(store.operation);
        const newResult = useCalculatorStore.getState().result;
        setCurrentNumber(newResult);

        store.setA(newResult);
        store.setB(0);
        store.setOperation(null);
      }
      return;
    }

    if (store.operation !== null && store.a !== 0) {
      store.setB(currentNumber);
      store.calculate(store.operation);
      const newResult = useCalculatorStore.getState().result;
      setCurrentNumber(0);
      store.setA(newResult);
      store.setB(0);
      store.setOperation(data);
    } else {
      store.setA(currentNumber);
      setCurrentNumber(0);
      store.setOperation(data);
    }
  }

  return (
    <div className='md:w-4/12 h-5/6 grid grid-cols-4 grid-rows-5 bg-linear-to-br from-mist-600 via-neutral-500 to-neutral-400 shadow-2xl text-white p-4 rounded-md gap-3'>
      <CalculatorScreen
        extraClasses='col-start-1 col-end-5'
        value={currentNumber ? currentNumber : 0}
        operation={operation}
      />
      <CalculatorNumbers collectorFn={getDigits} resetKey={resetKey} />
      <CalculatorControls collectorFn={getOperation} />
    </div>
  );
}

function CalculatorNumbers({ collectorFn, resetKey }: numberCollector) {
  const [digits, setDigit] = useImmer<number[]>([]);

  useEffect(() => {
    setDigit([]);
  }, [resetKey, setDigit]);

  function handleDigits(num: number) {
    const newDigits = [...digits, num];
    setDigit(newDigits);
    collectorFn(Number(newDigits.join("")));
  }

  const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div
      className='col-start-1 col-end-4
            row-start-2 row-end-6 grid grid-rows-3
            grid-cols-3 gap-3'
    >
      {numberPad.map((n: number) => (
        {
          if (n === 0) {
            return (<>
              <CalculatorButton
          key={n}
          text={n.toString()}
          clickFn={() => handleDigits(n)}
        />
              </>)
          }
        }
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
          <CalculatorButton
            key={c.key}
            text={c.name}
            type='CONTROL'
            extraClasses={c.rowClass}
            clickFn={() => collectorFn(opMap[c.name])}
          />
        );
      })}
    </div>
  );
}
