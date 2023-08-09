import { ReactNode } from "react";

interface TxtProps {
  className?: string;
  onClick: () => Promise<void> | void;
  children: ReactNode;
}

export function TxtButton({ className, onClick, children }: TxtProps) {
  return (
    <button
      className={className}
      css={{
        border: 'unset',
        background: 'unset',
        wordBreak: 'keep-all',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
