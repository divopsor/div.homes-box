import { CSSProperties, forwardRef, useState } from "react";
import { Spacing } from "./Space";
import { TextArea } from "./TextArea";

interface TextAreaFormProps {
  style?: CSSProperties;
  defaultText?: string;
  onSubmit: (inputText: string) => void | Promise<void>;
  onFocus: () => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
}

export const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaFormProps>(({ 
  style,
  defaultText,
  onSubmit,
  onFocus,
  placeholder,
  disabled = false
}, ref) => {
  const [inputText, setInputText] = useState<string>(defaultText ?? "");

  return (
    <>
      <TextArea
        ref={ref}
        value={inputText}
        setValue={setInputText}
        rows={Math.max(2, inputText.split("\n").length)}
        style={style}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
      />
      <Spacing size={4} />
      <button
        onClick={async () => {
          setInputText("");
          await onSubmit(inputText);
        }}
        style={{
          wordBreak: 'keep-all',
        }}
      >
        입력
      </button>
    </>
  );
});
