import { CSSProperties, ReactNode } from "react";

interface TxtProps {
  className?: string;
  onClick: () => Promise<void> | void;
  children: ReactNode;
  style?: CSSProperties;
}

export function TxtButton({ className, style, onClick, children }: TxtProps) {
  return (
    <button
      className={className}
      style={{
        border: 'unset',
        background: 'unset',
        wordBreak: 'keep-all',
        textDecoration: 'underline',
        cursor: 'pointer',
        ...(style ?? {}),
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
