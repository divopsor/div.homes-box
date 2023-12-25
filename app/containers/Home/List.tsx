'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import { API } from "../../api/index";
import { EditableListItem } from "../../components/ui/EditableListItem";
import { useFlashList } from "../../hooks/useList";
import { AuthContext } from "../../providers";
import { Form } from "./Form";

export function List() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as string;
  const [list, refetch] = useFlashList(category ?? 'knowledge');
  
  const onSubmit = async (inputText: string) => {
    const resource = {
      contents: inputText,
      priority: list.length,
      createdAt: Date.now(),
    };
    try {
      await API.of(category).createItem(resource);
      await new Promise(r => setTimeout(r, 1000));
      await refetch();
    } catch (error:any) {
      if (error.response.data.message === 'Not Allowed') {
        router.push('/login');
      }
    }
  }

  return (
    <>
      <ul>
        {list
          .sort((a: any, b: any) =>
            (a.body.priority ?? 0) > (b.body.priority ?? 0) ? -1 : 1
          )
          .map((data: any, index: number) => (
            <EditableListItem
              key={`${data.id}-${index}`}
              data={{ id: data.id, ...data.body, }}
              viewButtons={{
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
              onClick={(data) => {
                router.push(`/detail?category=${category}&id=${data.id}`);
              }}
            />
          ))}
      </ul>
      { auth ? <Form onSubmit={onSubmit}/> : null }
    </>
  )
}