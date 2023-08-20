'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { API } from "../../api/index";
import { Portal } from "../../components/Portal";
import { Container } from "../../components/ui/Container";
import { TextAreaForm } from "../../components/ui/TextAreaForm";
import { useFlashList } from "../../hooks/useList";
import { useMetaKeyShortcut } from "../../hooks/useMetaKeyShortcut";

export function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as string;
  const [list, refetch] = useFlashList(category ?? 'knowledge');
  const ref = useRef<HTMLTextAreaElement>(null);
  const [show, setShow] = useState<boolean>(false);  

  const onSubmit = async (inputText: string) => {
    const resource = {
      contents: inputText,
      priority: list.length,
      createdAt: Date.now(),
    };
    try {
      await API.of(category).createItem(resource);
      await new Promise(r => setTimeout(r, 1000));
      await refetch();
    } catch (error:any) {
      if (error.response.data.message === 'Not Allowed') {
        router.push('/login');
      }
    }
  }

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
    'Enter': () => {
      const value = ref.current?.value;
      if (value == null) {
        return;
      }

      onSubmit(value);
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
            style={{
              backgroundColor: '#c8c8c8d0',
              border: '0px',
              outline: 'none',
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 2px 5px 0px',
              height: '200px',
              overflowY: 'scroll'
            }}
          />
        </div>
      </Container>
    </Portal>
  );
}