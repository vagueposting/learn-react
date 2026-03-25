import type { ContainerChildren } from "../types";

export function Container({ children }: ContainerChildren) {
    return(
        <div className="flex justify-center items-center h-screen 
            bg-linear-to-b from-blue-300 to-teal-100">
            {children}
        </div>
    )
}