import { CSSProperties, forwardRef, ReactNode, useState } from "react";
import { Spacing } from "./Space";
import { TextArea } from "./TextArea";

interface TextAreaFormProps {
  style?: CSSProperties;
  defaultText?: string;
  onSubmit: (inputText: string) => void | Promise<void>;
  onFocus?: () => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: (e?: Event) => void | Promise<void>;
}

export const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaFormProps>(({ 
  style,
  defaultText,
  onFocus,
  placeholder,
  disabled = false,
  children,
  onClick,
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
        onClick={onClick}
      />
      {children}
    </>
  );
});
