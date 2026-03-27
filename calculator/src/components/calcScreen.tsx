import type { extraClasses, CalculatorState } from "../types";
import { cn } from "../utils/cn";

interface ScreenParam {
  extraClasses?: extraClasses;
  value: string;
  operation?: CalculatorState["operation"];
}

export function CalculatorScreen({
  extraClasses,
  value,
  operation,
}: ScreenParam) {
  const classes = cn(
    "grid grid-cols-6 grid-rows-4 p-3 justify-start align-center",
    "rounded-md",
    "bg-gradient-to-br from-aqua-forest-400 via-aqua-forest-300 to-aqua-forest-400",
    "text-3xl font-mono",
    extraClasses,
  );

  let operationItem;

  if (operation) {
    let opSign;

    switch (operation) {
      case "add":
        opSign = "+";
        break;
      case "subtract":
        opSign = "-";
        break;
      case "multiply":
        opSign = "×";
        break;
      case "divide":
        opSign = "÷";
        break;
    }

    operationItem = (
      <div className='col-start-6 col-end-7 row-start-4 row-end-5 text-lg select-none justify-self-center self-center'>
        {opSign}
      </div>
    );
  }

  return (
    <div
      className={classes}
      style={{
        boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.20) inset",
      }}
    >
      <div className='col-start-1 col-end-6 row-start-1 row-end-4'>{value}</div>
      {operationItem}
    </div>
  );
}
