import type { ContainerChildren } from "../types";

export function Container({ children }: ContainerChildren) {
  return (
    <div
      className='flex justify-center items-center h-screen 
            bg-linear-to-b from-teal-100 via-lime-100 to-amber-200'
    >
      {children}
    </div>
  );
}
