import { CSSProperties, ReactNode } from "react";
import { Stack } from "./Stack";

interface ListItemProps {
  className?: string;
  id?: string;
  left: ReactNode;
  right: ReactNode;
  bottom?: ReactNode;
  style?: CSSProperties;
}

export function ListItem({ style, id, className, left, right, bottom }: ListItemProps) {
  return (
    <li
      key={id}
      className={className}
      style={{
        borderRadius: '6px',
        ...(style ?? {}),
      }}
    >
      <Stack.Horizontal 
        style={{
          alignItems: 'baseline',
          justifyContent: 'space-between'
        }}
      >
        {left}
        {right}
      </Stack.Horizontal>
      {bottom}
    </li>
  );
}
