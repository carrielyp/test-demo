import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type ModalSheetGrayContainerProps = {
  children: ReactNode;
  className?: string;
};

export const ModalSheetGrayContainer = ({
  children,
  className
}: ModalSheetGrayContainerProps) => {
  return (
    <div
      className={twMerge(
        "max-w-[1000px] rounded-lg bg-neutral-10 p-4",
        className
      )}
    >
      {children}
    </div>
  );
};
