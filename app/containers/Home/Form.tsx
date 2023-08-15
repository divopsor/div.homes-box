'use client';

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { API } from "../../api/index";
import { TextAreaForm } from "../../components/ui/TextAreaForm";
import { useFlashList } from "../../hooks/useList";
import { useMetaKeyShortcut } from "../../hooks/useMetaKeyShortcut";
import { AuthContext } from "../../providers";

export function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as string;
  const [list, refetch] = useFlashList(category ?? 'knowledge');
  const ref = useRef<HTMLTextAreaElement>(null);
  const [guest, setGestMode] = useState(false);
  const auth = useContext(AuthContext);

  useMetaKeyShortcut({
    'k': () => ref.current?.focus()
  });

  useEffect(() => {
    if (auth) {
      setGestMode(false);
      return;
    }

    setGestMode(true);
  }, [])

  return (
    <TextAreaForm
      placeholder={guest ? '권한이 없습니다.': ''}
      disabled={guest}
      ref={ref}
      onSubmit={async (inputText) => {
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
      }}
    />
  )
}