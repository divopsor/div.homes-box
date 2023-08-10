import { CSSProperties, ReactNode } from "react";

interface TxtProps {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function Txt({ style, className, children }: TxtProps) {
  return (
    <p
      className={className}
      style={{
        width: '100%',
        fontSize: '1.6rem',
        wordBreak: 'keep-all',
        whiteSpace: 'pre-line',
        ...(style ?? {}),
      }}
      dangerouslySetInnerHTML={{ __html: `${children}` }}
    />
  );
}
