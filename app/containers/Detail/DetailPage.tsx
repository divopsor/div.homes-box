'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { API } from '../../api/gist';
import { Container } from '../../components/ui/Container';
import { EditableListItem } from '../../components/ui/EditableListItem';
import { Spacing } from '../../components/ui/Space';
import { Stack } from '../../components/ui/Stack';
import { TextArea } from '../../components/ui/TextArea';
import { Txt } from '../../components/ui/Txt';
import { TxtButton } from '../../components/ui/TxtButton';
import { useFlashCategoryList, useFlashItem, useFlashList } from '../../hooks/useList';
import { AuthContext } from '../../providers';
import { Form } from '../Home/Form';

export const DetailPage = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as string;
  const id = searchParams.get('id') as string;
  const [data, refetch] = useFlashItem(category ?? 'knowledge', id);
  const [parent] = useFlashItem(category ?? 'knowledge', data?.body?.parentId);
  const [childList] = useFlashList(category ?? 'knowledge', id);
  const [categoryList] = useFlashCategoryList();
  const [currentCategoryName, currentCategoryId] = Object.entries(categoryList ?? []).find((x: any) => x?.[1] === category) ?? [];

  const onSubmit = async (text: string) => {
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
    } catch (error:any) {
      if (error.response.data.message === 'Not Allowed') {
        router.push('/login');
      }
    }
  }
  
  const onSubmitCreate = async (text: string) => {
    try {
      await API.of(category).createItem({
        contents: text,
        priority: childList.length,
        updatedAt: Date.now(),
        parentId: id,
      });

      await new Promise(r => setTimeout(r, 1000));

      await refetch();
    } catch (error:any) {
      if (error.response.data.message === 'Not Allowed') {
        router.push('/login');
      }
    }
  }

  if (data == null) {
    return (
      <main>
        <Container width={720}>{''}</Container>
      </main>
    )
  }

  return (
    <>
      <Spacing size={60} />

      <main>
        <Container width={720}>
          <Stack.Horizontal align='space-between'>
            <Stack.Vertical align='left'>
              <Stack.Horizontal>
                <Txt
                  style={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    marginBottom: '8px',
                    width: 'unset',
                  }}
                  onClick={() => {
                    router.push(`/?category=${currentCategoryId}`)
                  }}
                >
                  {currentCategoryName}
                </Txt>
                {
                  parent != null ? (
                    <>
                      <Txt
                        style={{
                          fontWeight: 'bold',
                          fontSize: '16px',
                          marginBottom: '8px',
                          marginLeft: '8px',
                          width: 'unset',
                        }}
                      >
                        {'>'}
                      </Txt>
                      <Txt
                      style={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        marginBottom: '8px',
                        marginLeft: '8px',
                        whiteSpace: 'normal',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',  
                      }}
                      onClick={() => {
                        router.push(`/detail/?category=${currentCategoryId}&id=${parent.id}`)
                      }}
                    >
                      {parent.body.contents.split('\n')?.[0]}
                    </Txt>
                  </>
                  ) : null
                }
              </Stack.Horizontal>
              <Txt 
                style={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                }}
              >
                {data.body.contents.split('\n')?.[0]}
              </Txt>
            </Stack.Vertical>
            <Stack.Horizontal>
              {
                auth ? 
                  <>
                    <TxtButton onClick={
                      async () => {
                        try {
                          await API.of(category).deleteItem(data.id);

                          await new Promise(r => setTimeout(r, 1000));
                          await refetch();

                          if (parent != null) {
                            router.push(`/detail/?category=${currentCategoryId}&id=${parent.id}`);
                            return;
                          }

                          router.push(`/?category=${category}`);
                        } catch (error:any) {
                          if (error.response.data.message === 'Not Allowed') {
                            router.push('/login');
                          }
                        }
                      }
                    }>삭제</TxtButton>
                  </>
                  : null
              }
            </Stack.Horizontal>
          </Stack.Horizontal>

          <TextArea.View 
            style={{ alignItems: 'flex-start' }} 
            value={withoutFirstLine(data.body.contents)}
          />
          { auth ? <Form openKey='m' initialValue={data.body.contents} onSubmit={onSubmit}/> : null }
          { auth ? <Form openKey='k' onSubmit={onSubmitCreate}/> : null }

          <ul>
            {childList
              .sort((a: any, b: any) =>
                (a.body.priority ?? 0) > (b.body.priority ?? 0) ? -1 : 1
              )
              .map((data: any, index: number) => (
                <EditableListItem
                  key={`${data.id}-${index}`}
                  data={{ id: data.id, ...data.body, }}
                  onClick={() => {
                    router.push(`/detail?category=${category}&id=${data.id}`);
                  }}
                  viewButtons={{
                    "⬆": async () => {
                      if (index <= 0) {
                        return;
                      }

                      const a = childList[index];
                      const b = childList[index - 1];

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
                      if (index >= childList.length - 1) {
                        return;
                      }
                      const a = childList[index];
                      const b = childList[index + 1];

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
                />
              ))}
          </ul>
        </Container>
      </main>
    </>
  );
};

function withoutFirstLine(str: string) {
  const [, ...res] = str.split('\n');

  return res.join('\n');
}