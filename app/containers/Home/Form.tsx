'use client';

import { useSearchParams } from "next/navigation";
import { API } from "../../api/index";
import { TextAreaForm } from "../../components/ui/TextAreaForm";
import { useFlashList } from "../../hooks/useList";

export function Form() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as string;
  const [list, refetch] = useFlashList(category ?? 'work');

  return (
    <TextAreaForm
      onSubmit={async (inputText) => {
        const resource = {
          contents: inputText,
          priority: list.length,
        };
        await API.of(category).createItem(resource);
        await refetch();
      }}
    />
  )
}