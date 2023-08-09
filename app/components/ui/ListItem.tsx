import { ReactNode } from "react";
import { Stack } from "./Stack";

interface ListItemProps {
  className?: string;
  id?: string;
  left: ReactNode;
  right: ReactNode;
}

export function ListItem({ id, className, left, right }: ListItemProps) {
  return (
    <li
      key={id}
      className={className}
      css={{
        borderRadius: '6px',
      }}
    >
      <Stack.Horizontal>
        {left}
        {right}
      </Stack.Horizontal>
    </li>
  );
}
