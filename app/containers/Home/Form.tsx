'use client';

import { API } from "../../api/index";
import { TextAreaForm } from "../../components/ui/TextAreaForm";
import { useFlashList } from "../../hooks/useList";

export function Form({ category }: { category: string }) {
  const [list, refetch] = useFlashList(category);

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