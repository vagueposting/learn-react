import type { extraClasses } from "../types";
import { cn } from "../utils/cn";

interface ScreenParam {
  extraClasses?: extraClasses;
}

export function CalculatorScreen({ extraClasses }: ScreenParam) {
  const classes = cn(
    "rounded-md",
    "bg-gradient-to-br from-aqua-forest-400 via-aqua-forest-300 to-aqua-forest-400",
    extraClasses,
  );

  return <div className={classes}></div>;
}
