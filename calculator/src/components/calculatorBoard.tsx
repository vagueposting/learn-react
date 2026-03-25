import type { ContainerChildren } from "../types";

export function CalculatorBoard({ children }: ContainerChildren) {
    return (
        <div className=
        "grid-cols-4 grid-rows-4 bg-blue-950 text-white p-4 rounded-sm">
            {children}
        </div>
    )
}