'use client';

import type { NextPage } from "next";
import { API } from "../../api/index";
import { MainMenus } from "../../components/MainMenus";
// import { GtdTodoAPI, GtdDoneAPI } from "../../api/index";
import { Container } from "../../components/ui/Container";
import { EditableListItem } from "../../components/ui/EditableListItem";
import { Spacing } from "../../components/ui/Space";
import { Stack } from "../../components/ui/Stack";
import { TextAreaForm } from "../../components/ui/TextAreaForm";
import { useFlashList } from "../../hooks/useList";

export const HomePage: NextPage = () => {
  const category = typeof window === 'undefined' ? '' : window.location.pathname.split('/').pop()!;
  const [todoList, refetchTodoList] = useFlashList(category);

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
                priority: todoList.length,
              };
              await API.of(category).createItem(resource);
              await refetchTodoList();
            }}
          />
        </Stack.Vertical>

        <Spacing size={20} />

        <ul>
          {todoList
            .sort((a: any, b: any) =>
              (a.body.priority ?? 0) > (b.body.priority ?? 0) ? 1 : -1
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
                    await refetchTodoList();
                  },
                  "⬆": async () => {
                    if (index <= 0) {
                      return;
                    }
                    const a = todoList[index];
                    const b = todoList[index - 1];

                    const aResource = {
                      contents: a.body.contents,
                      priority: b.body.priority,
                    };

                    await API.of(category).updateItem(
                      a.id,
                      aResource,
                    );

                    const bResource = {
                      contents: b.body.contents,
                      priority: a.body.priority,
                    };

                    await API.of(category).updateItem(
                      b.id,
                      bResource,
                    );

                    await refetchTodoList();
                  },
                  "⬇": async () => {
                    if (index >= todoList.length - 1) {
                      return;
                    }
                    const a = todoList[index];
                    const b = todoList[index + 1];

                    const aResource = {
                      contents: a.body.contents,
                      priority: b.body.priority,
                    };

                    await API.of(category).updateItem(
                      a.id,
                      aResource,
                    );

                    const bResource = {
                      contents: b.body.contents,
                      priority: a.body.priority,
                    };

                    await API.of(category).updateItem(
                      b.id,
                      bResource,
                    );

                    await refetchTodoList();
                  },
                }}
                editButtons={{
                  제출: async ({ text, setMode }) => {
                    const resource = {
                      contents: text,
                      priority: data.priority,
                    };
                    await API.of(category).updateItem(
                      data.id,
                      resource,
                    );

                    await refetchTodoList();
                    setMode("view");
                  },
                  취소: ({ setText, setMode }) => {
                    setText(data.contents);
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
