'use client';

import { API } from "../../api/index";
import { MainMenus } from "../../components/MainMenus";
import { Container } from "../../components/ui/Container";
import { EditableListItem } from "../../components/ui/EditableListItem";
import { Spacing } from "../../components/ui/Space";
import { Stack } from "../../components/ui/Stack";
import { TextAreaForm } from "../../components/ui/TextAreaForm";
import { useList } from "../../hooks/useList";

export const HomePage = ({ category }: { category: string }) => {
  const [list, refetch] = useList(category);

  return (
    <main>
      <Spacing size={30} />

      <MainMenus />

      <Spacing size={30} />

      <Container width={720}>
        <Stack.Vertical align="right">
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
        </Stack.Vertical>

        <Spacing size={20} />

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
      </Container>
    </main>
  );
};
