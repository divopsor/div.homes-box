import { CSSProperties, ElementType, ReactNode } from "react";

interface TxtProps {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  as?: ElementType;
}

export function Txt({
  style,
  className,
  children,
  onClick,
  as: Component = 'p',
}: TxtProps) {
  return (
    <Component
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
