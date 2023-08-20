'use client';

import { useRef, useState } from "react";
import { Portal } from "../../components/Portal";
import { Container } from "../../components/ui/Container";
import { TextAreaForm } from "../../components/ui/TextAreaForm";
import { useMetaKeyShortcut } from "../../hooks/useMetaKeyShortcut";

interface FormProps {
  initialValue?: string;
  onSubmit: (text: string) => Promise<void>;
}

export function Form({ initialValue, onSubmit }: FormProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [show, setShow] = useState<boolean>(false);

  const toggleForm = () => {
    if (show) {
      setShow(false);
      return;
    }

    setShow(true);
    setTimeout(() => {
      ref.current?.focus();
    }, 0);
  };

  useMetaKeyShortcut({
    'k': () => toggleForm(),
    'Escape': () => setShow(false),
    'Enter': async () => {
      const value = ref.current?.value;
      if (value == null) {
        return;
      }

      await onSubmit(value);
      setShow(false);
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <Portal>
      <Container
        onClick={() => {
          setShow(false);
        }}
        width={720}
        style={{
          position: 'fixed',
          backgroundColor: '#c8c8c8aa',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
      >
        <div style={{
          width: '720px',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          position: 'relative',
        }}>
          <TextAreaForm
            ref={ref}
            onSubmit={onSubmit}
            defaultText={initialValue}
            style={{
              backgroundColor: '#c8c8c8d0',
              border: '0px',
              outline: 'none',
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 2px 5px 0px',
              height: '200px',
              overflowY: 'scroll'
            }}
            onClick={(e?: Event) => {
              e?.preventDefault();
              e?.stopPropagation();
              return;
            }}
          />
        </div>
      </Container>
    </Portal>
  );
}