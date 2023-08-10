import { CSSProperties, ReactNode } from "react";
import { Stack } from "./Stack";

interface ListItemProps {
  className?: string;
  id?: string;
  left: ReactNode;
  right: ReactNode;
  style?: CSSProperties;
}

export function ListItem({ style, id, className, left, right }: ListItemProps) {
  return (
    <li
      key={id}
      className={className}
      style={{
        borderRadius: '6px',
        ...(style ?? {}),
      }}
    >
      <Stack.Horizontal>
        {left}
        {right}
      </Stack.Horizontal>
    </li>
  );
}
