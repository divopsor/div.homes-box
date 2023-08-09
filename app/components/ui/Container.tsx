import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  width?: number;
}

export const Container = ({
  className,
  children,
  width = 720,
}: ContainerProps) => {
  return (
    <div
      className={className}
      style={{
        margin: `0 auto`,
        width: `${width}px`
      }}
    >
      {children}
    </div>
  );
};
