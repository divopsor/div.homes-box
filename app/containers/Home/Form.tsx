'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { API } from "../../api/index";
import { TextAreaForm } from "../../components/ui/TextAreaForm";
import { useFlashList } from "../../hooks/useList";

export function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as string;
  const [list, refetch] = useFlashList(category ?? 'work');

  return (
    <TextAreaForm
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
    />
  )
}