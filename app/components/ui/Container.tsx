import { CSSProperties, ReactNode } from "react";

interface ContainerProps{
  children: ReactNode;
  className?: string;
  width?: number;
  style?: CSSProperties;
  onClick?: () => void;
}

export const Container = ({
  className,
  children,
  width = 720,
  style,
  onClick,
}: ContainerProps) => {
  return (
    <div
      className={className}
      style={{
        margin: `0 auto`,
        width: `${width}px`,
        ...(style ?? {}),
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
