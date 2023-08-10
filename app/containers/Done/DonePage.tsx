'use client';

import type { NextPage } from "next";
import { Container } from "../../components/ui/Container";
import { EditableListItem } from "../../components/ui/EditableListItem";
import { Spacing } from "../../components/ui/Space";
import { Txt } from "../../components/ui/Txt";
import { useFlashList } from "../../hooks/useList";

export const DonePage: NextPage = () => {
  const [todoList, refetchTodoList] = useFlashList("done");

  return (
    <main>
      <Spacing size={30} />

      <Container width={720}>
        <Txt>완료된 목록</Txt>

        <Spacing size={20} />

        <ul>
          {todoList.map((data: any) => (
            <EditableListItem
              id={data.id}
              key={data.id}
              data={data}
              viewButtons={{
                삭제: async () => {
                  // await GtdDoneAPI.delete({ id: data.id });
                  await refetchTodoList();
                },
              }}
            />
          ))}
        </ul>
      </Container>
    </main>
  );
};
