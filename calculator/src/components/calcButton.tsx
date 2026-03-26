import type { extraClasses } from "../types";
import { cn } from "../utils/cn";
import { useState } from "react";

interface CalcButt {
  text: string;
  type?: "NUMBER" | "CONTROL";
  extraClasses?: extraClasses;
}

export function CalculatorButton({
  text,
  type = "NUMBER",
  extraClasses,
}: CalcButt) {
  const [isPressed, setIsPressed] = useState(false);

  let shadows;

  const shadowColor = {
    NUMBER: "91, 91, 75",
    CONTROL: "245, 74, 0",
  };

  if (isPressed) {
    shadows = `inset 0px 0px 1px 8px rgba(${shadowColor[type]}, 0.1)`;
  } else {
    shadows = `inset -5px -7px 0px 0px rgba(${shadowColor[type]}, 0.20), 0px 4px 6px rgba(0, 0, 0, 0.1)`;
  }

  let typeClass;

  if (type === "CONTROL") {
    typeClass = "bg-orange-300 text-2xl font-bold";
  } else {
    typeClass = "bg-olive-300 text-3xl";
  }

  const classes = cn(
    "flex justify-center items-center p-2 h-full cursor-pointer",
    "text-zinc-800 font-mono rounded-md",
    typeClass,
    extraClasses,
  );

  return (
    <button
      className={classes}
      style={{
        boxShadow: shadows,
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {text}
    </button>
  );
}
