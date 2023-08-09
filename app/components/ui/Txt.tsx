import { ReactNode } from "react";

interface TxtProps {
  className?: string;
  children: ReactNode;
}

export function Txt({ className, children }: TxtProps) {
  return (
    <p
      className={className}
      css={{
        width: '100%',
        fontSize: '1.6rem',
        wordBreak: 'keep-all',
        whiteSpace: 'pre-line',
      }}
      dangerouslySetInnerHTML={{ __html: `${children}` }}
    />
  );
}
