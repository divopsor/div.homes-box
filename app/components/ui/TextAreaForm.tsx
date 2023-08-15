import { forwardRef, useState } from "react";
import { Spacing } from "./Space";
import { TextArea } from "./TextArea";

interface TextAreaFormProps {
  defaultText?: string;
  onSubmit: (inputText: string) => void | Promise<void>;
}

export const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaFormProps>(({ defaultText, onSubmit }, ref) => {
  const [inputText, setInputText] = useState<string>(defaultText ?? "");

  return (
    <>
      <TextArea
        ref={ref}
        value={inputText}
        setValue={setInputText}
        rows={Math.max(2, inputText.split("\n").length)}
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
