// import { GtdTodoAPI } from "../api/index";
import { useSearchParams } from "next/navigation";
import { API } from "../api/index";
import { useFlashList } from "../hooks/useList";
import { Container } from "./ui/Container";
import { TxtButton } from "./ui/TxtButton";

export function MainMenus() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as string;
  const [todoList, refetchTodoList] = useFlashList(category);

  if (category == null || Array.isArray(category) || category === '') {
    return null;
  }

  if (todoList == null || todoList.length === 0) {
    return null;
  }

  return (
    <Container
      css={{
        textAlign: 'right',
      }}
    >
      <TxtButton
        css={{
          padding: '0',
        }}
        onClick={async () => {
          if (todoList == null || todoList.length === 0) {
            alert("잠시 후 다시 시도해주세요.");
            return;
          }

          for (let i = 0; i < todoList.length; i++) {
            const todo = todoList[i];

            if (Number(todo.priority) === i) {
              continue;
            }

            const resource = {
              contents: todo.body.contents,
              priority: i,
            };

            await API.of(category).updateItem(
              todo.id,
              resource
            );
          }

          await refetchTodoList();
        }}
      >
        재정렬
      </TxtButton>
    </Container>
  );
}
