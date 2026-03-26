import type { extraClasses } from "../types";
import { cn } from "../utils/cn";

interface CalcButt {
  text: string;
  type?: "NUMBER" | "CONTROL";
  extraClasses?: extraClasses;
}

export function CalculatorButton({ text, type, extraClasses }: CalcButt) {
  let typeClass;

  if (type === "CONTROL") {
    typeClass = "bg-amber-400 text-zinc-800 test-2xl font-bold";
  } else {
    typeClass = "bg-cyan-700 text-3xl";
  }

  const classes = cn(
    "flex justify-center items-center p-2 h-full rounded-md cursor-pointer font-mono",
    typeClass,
    extraClasses,
  );
  return <button className={classes}>{text}</button>;
}
