import type { extraClasses, CalculatorState } from "../types";
import { cn } from "../utils/cn";

interface ScreenParam {
  extraClasses?: extraClasses;
  value: string;
  operation?: CalculatorState["operation"];
}

export function CalculatorScreen({ extraClasses, value }: ScreenParam) {
  const classes = cn(
    "rounded-md",
    "bg-gradient-to-br from-aqua-forest-400 via-aqua-forest-300 to-aqua-forest-400",
    extraClasses,
  );

  return <div className={classes}>{value}</div>;
}
