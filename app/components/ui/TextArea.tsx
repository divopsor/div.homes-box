import { Txt } from "./Txt";

interface TextAreaProps {
  className?: string;
  value: string;
  setValue: (_: string) => void;
  rows?: number;
  cols?: number;
}
export function TextArea({
  className,
  setValue,
  value,
  rows,
  cols,
}: TextAreaProps) {
  return (
    <textarea
      className={className}
      spellCheck={false}
      css={{
        resize: 'none',
        width: `${cols == null ? '100%' : 'auto'}`,
        fontSize: '1.6rem',
        wordBreak: 'keep-all',
        whiteSpace: 'pre-line',
        fontFamily: '"Noto Sans KR", sans-serif'
      }}
      value={value}
      rows={rows ?? value.split("\n").length}
      cols={cols}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

TextArea.View = ({ value }: Pick<TextAreaProps, "value">) => {
  if (value == null) {
    return null;
  }

  return (
    <Txt
      css={{
        padding: '3px'
      }}
    >
      {value.replace(
        /(https?:\/\/\S+)/g,
        '<a href="$1" target="_blank" style="color: blue; text-decoration: underline;">Link</a>'
      )}
    </Txt>
  );
};
