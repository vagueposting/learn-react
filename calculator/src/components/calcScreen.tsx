import type { extraClasses } from "../types";
import { cn } from "../utils/cn";

interface ScreenParam {
  extraClasses?: extraClasses;
}

export function CalculatorScreen({ extraClasses }: ScreenParam) {
  const classes = cn("bg-white rounded-md", extraClasses);

  return <div className={classes}></div>;
}
