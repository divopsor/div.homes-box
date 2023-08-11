import { CSSProperties, ReactNode } from "react";

interface TxtProps {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
}

export function Txt({ style, className, children, onClick }: TxtProps) {
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
      onClick={onClick}
    />
  );
}
