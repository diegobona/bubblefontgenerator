import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  size?: "default" | "wide";
};

const containerSizes = {
  default: "max-w-6xl",
  wide: "max-w-[1680px]",
};

export function PageContainer({ children, size = "default" }: PageContainerProps) {
  return (
    <div className={`mx-auto w-full ${containerSizes[size]} px-4 sm:px-6 lg:px-8`}>
      {children}
    </div>
  );
}
