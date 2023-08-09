import { ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "space-between";
}

function StackHorizontal({
  children,
  className,
  align = "center",
}: StackProps) {
  return (
    <div
      className={className}
      css={{
        display: 'flex',
        justifyContent: `${align}`,
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
}

function StackVertical({ children, className, align = "center" }: StackProps) {
  return (
    <div
      className={className}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: `${align === "right"
          ? "end"
          : align === "left"
          ? "start"
          : "center"}`,
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
