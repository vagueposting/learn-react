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
  const [currentNumber, setCurrentNumber] = useImmer<string>("0");
  const [resetKey, setResetKey] = useImmer(0);

  function getDigits(data: string): void {
    console.log("CalculatorBoard: getDigits received", data);
    setCurrentNumber(data);
  }

  // Inside CalculatorBoard component
  function getOperation(data: CalculatorAction): void {
    console.log("getOperation called with:", data);
    console.trace();

    if (data === null) {
      // Clear everything
      const store = useCalculatorStore.getState();
      store.setA(0);
      store.setB(0);
      store.setOperation(null);
      setCurrentNumber("0");
      setResetKey((k) => k + 1);
      return;
    }

    const store = useCalculatorStore.getState();

    if (data === "equals") {
      if (store.operation !== null && store.a !== 0) {
        store.setB(parseFloat(currentNumber));
        store.calculate(store.operation);
        const newResult = useCalculatorStore.getState().result;
        setCurrentNumber(newResult.toString());

        store.setA(newResult);
        store.setB(0);
        store.setOperation(null);

        // Reset inputString for the next number
        setResetKey((k) => k + 1);
      }
      return;
    }

    // For any operator (+, -, ×, ÷)
    if (store.operation !== null && store.a !== 0) {
      // There is already a pending operation, compute it first
      store.setB(parseFloat(currentNumber));
      store.calculate(store.operation);
      const newResult = useCalculatorStore.getState().result;
      setCurrentNumber("0");
      store.setA(newResult);
      store.setB(0);
      store.setOperation(data);
      // Reset inputString for the next number
      setResetKey((k) => k + 1);
    } else {
      // First operation, just store the current number
      store.setA(parseFloat(currentNumber));
      setCurrentNumber("0");
      store.setOperation(data);
      // Reset inputString for the next number
      setResetKey((k) => k + 1);
    }
  }

  console.log("Board render, current number = ", currentNumber);

  return (
    <div
      className='md:w-4/12 h-5/6 grid grid-cols-4 grid-rows-5 bg-linear-to-br from-mist-600 via-neutral-500 to-neutral-400 shadow-2xl text-white pr-6 pl-4 pt-4 pb-4 rounded-md gap-3'
      style={{
        boxShadow: "inset -5px -7px 0px 0px rgba(0, 0, 0, 0.20)",
      }}
    >
      <CalculatorScreen
        extraClasses='col-start-1 col-end-5'
        value={currentNumber || "0"}
        operation={operation}
      />
      <CalculatorNumbers collectorFn={getDigits} resetKey={resetKey} />
      <CalculatorControls collectorFn={getOperation} />
    </div>
  );
}

function CalculatorNumbers({ collectorFn, resetKey }: numberCollector) {
  const [inputString, setInputString] = useImmer<string>("");

  useEffect(() => {
    setInputString("");
  }, [resetKey, setInputString]);

  function handleDigits(value: string) {
    console.log("handleDigits called with: ", value);
    if (value === "." && inputString.includes(".")) return;

    const newString = inputString + value;

    console.log("CalculatorNumber: newString = ", newString);

    setInputString(newString);

    collectorFn(newString);
  }

  const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const numberKeys = numberPad.map((n: number) => {
    if (n === 0) {
      return (
        <CalculatorButton
          key={n}
          text={n.toString()}
          type='NUMBER'
          clickFn={() => {
            console.log("Button clicked: ", n);
            handleDigits(n.toString());
          }}
          extraClasses='row-start-4 row-end-5 col-start-1 col-end-3'
        />
      );
    }

    return (
      <CalculatorButton
        key={n}
        text={n.toString()}
        clickFn={() => {
          console.log("Button clicked: ", n);
          handleDigits(n.toString());
        }}
      />
    );
  });

  return (
    <div
      className='col-start-1 col-end-4
            row-start-2 row-end-6 grid grid-rows-4
            grid-cols-3 gap-3'
    >
      {numberKeys}
      <CalculatorButton
        key='decimal'
        text='.'
        clickFn={() => handleDigits(".")}
        extraClasses='row-start-4 row-end-5 col-start-3 col-end-4'
      />
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
            clickFn={() => {
              console.log("Control button clickFn called for", c.name);
              console.trace();
              collectorFn(opMap[c.name]);
            }}
          />
        );
      })}
    </div>
  );
}
