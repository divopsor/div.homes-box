'use client';

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { API } from "../../api/index";
import { TextAreaForm } from "../../components/ui/TextAreaForm";
import { useFlashList } from "../../hooks/useList";
import { useMetaKeyShortcut } from "../../hooks/useMetaKeyShortcut";

export function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as string;
  const [list, refetch] = useFlashList(category ?? 'knowledge');
  const ref = useRef<HTMLTextAreaElement>(null);
  const [guest, setGestMode] = useState(false);

  useMetaKeyShortcut({
    'k': () => ref.current?.focus()
  });

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
          await refetch();
        } catch (error:any) {
          if (error.response.data.message === 'Not Allowed') {
            router.push('/login');
          }
        }
      }}
      onFocus={async () => {
        try {
          await API.authCheck();
          setGestMode(false);
        } catch {
          setGestMode(true);
        }
      }}
    />
  )
}