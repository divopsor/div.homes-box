'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { API } from "../../api/index";
import { EditableListItem } from "../../components/ui/EditableListItem";
import { useFlashList } from "../../hooks/useList";

export function List() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as string;
  const [list, refetch] = useFlashList(category ?? 'knowledge');
  
  return (
    <ul>
      {list
        .sort((a: any, b: any) =>
          (a.body.priority ?? 0) > (b.body.priority ?? 0) ? -1 : 1
        )
        .map((data: any, index: number) => (
          <EditableListItem
            key={`${data.id}-${index}`}
            id={data.id}
            data={data.body}
            viewButtons={{
              수정: ({ setMode }) => setMode("edit"),
              삭제: async () => {
                try {
                  await API.of(category).deleteItem(data.id);
                  await new Promise(r => setTimeout(r, 1000));
                  await refetch();
                } catch (error:any) {
                  if (error.response.data.message === 'Not Allowed') {
                    router.push('/login');
                  }
                }
              },
              "⬆": async () => {
                if (index <= 0) {
                  return;
                }

                const a = list[index];
                const b = list[index - 1];

                const aResource = {
                  ...a.body,
                  priority: b.body.priority,
                };

                const bResource = {
                  ...b.body,
                  priority: a.body.priority,
                };

                try {
                  await API.of(category).updateItems([
                    {
                      id: a.id,
                      body: aResource,
                    },
                    {
                      id: b.id,
                      body: bResource,
                    }
                  ]);
  
                  await refetch();
                } catch (error:any) {
                  if (error.response.data.message === 'Not Allowed') {
                    router.push('/login');
                  }
                }
              },
              "⬇": async () => {
                if (index >= list.length - 1) {
                  return;
                }
                const a = list[index];
                const b = list[index + 1];

                const aResource = {
                  ...a.body,
                  priority: b.body.priority,
                };

                const bResource = {
                  ...b.body,
                  priority: a.body.priority,
                };

                try {
                  await API.of(category).updateItems([
                    {
                      id: a.id,
                      body: aResource,
                    },
                    {
                      id: b.id,
                      body: bResource,
                    }
                  ]);
  
                  await refetch();
                } catch (error:any) {
                  if (error.response.data.message === 'Not Allowed') {
                    router.push('/login');
                  }
                }
              },
            }}
            editButtons={{
              제출: async ({ text, setMode }) => {
                try {
                  const resource = {
                    ...data.body,
                    contents: text,
                    updatedAt: Date.now(),
                  };

                  await API.of(category).updateItem(
                    data.id,
                    resource,
                  );

                  await refetch();
                  setMode("view");
                } catch (error:any) {
                  if (error.response.data.message === 'Not Allowed') {
                    router.push('/login');
                  }
                }
              },
              취소: ({ setText, setMode }) => {
                setText(data.body.contents);
                setMode("view");
              },
            }}
          />
        ))}
    </ul>
  )
}