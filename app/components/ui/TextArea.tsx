import { CSSProperties, forwardRef } from "react";
import { Txt } from "./Txt";

interface TextAreaProps {
  className?: string;
  style?: CSSProperties;
  value: string;
  setValue: (_: string) => void;
  rows?: number;
  cols?: number;
  onClick?: () => void;
}
const TextAreaImpl = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  className,
  style,
  setValue,
  value,
  rows,
  cols,
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={className}
      spellCheck={false}
      style={{
        resize: 'none',
        width: `${cols == null ? '100%' : 'auto'}`,
        fontSize: '1.6rem',
        wordBreak: 'keep-all',
        whiteSpace: 'pre-line',
        fontFamily: '"Noto Sans KR", sans-serif',
        ...(style ?? {}),
      }}
      value={value}
      rows={rows ?? value.split("\n").length}
      cols={cols}
      onChange={(e) => setValue(e.target.value)}
    />
  );
});

TextAreaImpl.displayName = 'TextArea';

const TextAreaView = ({ value, style, onClick }: Pick<TextAreaProps, "value" | "style" | "onClick">) => {
  if (value == null) {
    return null;
  }

  return (
    <Txt
      style={{
        padding: '3px',
        ...(style ?? {}),
      }}
      onClick={onClick}
    >
      {value.replace(
        /(https?:\/\/\S+)/g,
        '<a href="$1" target="_blank" style="color: blue; text-decoration: underline;">Link</a>'
      )}
    </Txt>
  );
};

export const TextArea = Object.assign(TextAreaImpl, { View: TextAreaView });
