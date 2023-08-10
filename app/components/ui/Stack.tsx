import { CSSProperties, ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "space-between";
  style?: CSSProperties;
}

function StackHorizontal({
  children,
  className,
  align = "center",
  style,
}: StackProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: `${align}`,
        alignItems: 'center',
        ...(style ?? {}),
      }}
    >
      {children}
    </div>
  );
}

function StackVertical({ children, className, align = "center", style }: StackProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: `${align === "right"
          ? "end"
          : align === "left"
          ? "start"
          : "center"}`,
        ...(style ?? {}),
      }}
    >
      {children}
    </div>
  );
}

export const Stack = {
  Horizontal: StackHorizontal,
  Vertical: StackVertical,
};
