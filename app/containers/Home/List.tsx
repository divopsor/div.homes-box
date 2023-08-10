'use client';

import { API } from "../../api/index";
import { EditableListItem } from "../../components/ui/EditableListItem";
import { useFlashList } from "../../hooks/useList";

export function List({ category } : { category: string }) {
  const [list, refetch] = useFlashList(category);
  
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
                await API.of(category).deleteItem(data.id);
                await new Promise(r => setTimeout(r, 1000));
                await refetch();
              },
              "⬆": async () => {
                if (index <= 0) {
                  return;
                }
                const a = list[index];
                const b = list[index - 1];

                const aResource = {
                  contents: a.body.contents,
                  priority: b.body.priority,
                };

                const bResource = {
                  contents: b.body.contents,
                  priority: a.body.priority,
                };

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
              },
              "⬇": async () => {
                if (index >= list.length - 1) {
                  return;
                }
                const a = list[index];
                const b = list[index + 1];

                const aResource = {
                  contents: a.body.contents,
                  priority: b.body.priority,
                };

                const bResource = {
                  contents: b.body.contents,
                  priority: a.body.priority,
                };

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
              },
            }}
            editButtons={{
              제출: async ({ text, setMode }) => {
                const resource = {
                  contents: text,
                  priority: data.body.priority,
                };
                await API.of(category).updateItem(
                  data.id,
                  resource,
                );

                await refetch();
                setMode("view");
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