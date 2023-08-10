import { useSearchParams } from "next/navigation";
import { API } from "../api/index";
import { useList } from "../hooks/useList";
import { Container } from "./ui/Container";
import { TxtButton } from "./ui/TxtButton";

export function MainMenus() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category')!;
  const [list, refetch] = useList(category);

  if (category == null || Array.isArray(category) || category === '') {
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
          if (list == null || list.length === 0) {
            alert("잠시 후 다시 시도해주세요.");
            return;
          }

          for (let i = 0; i < list.length; i++) {
            const todo = list[i];

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

          await refetch();
        }}
      >
        재정렬
      </TxtButton>
    </Container>
  );
}
