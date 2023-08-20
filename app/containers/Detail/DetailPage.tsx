'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { API } from '../../api/gist';
import { Container } from '../../components/ui/Container';
import { Stack } from '../../components/ui/Stack';
import { TextArea } from '../../components/ui/TextArea';
import { Txt } from '../../components/ui/Txt';
import { TxtButton } from '../../components/ui/TxtButton';
import { useFlashCategoryList, useFlashList } from '../../hooks/useList';
import { AuthContext } from '../../providers';
import { Form } from '../Home/Form';

export const DetailPage = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as string;
  const id = searchParams.get('id') as string;
  const [list, refetch] = useFlashList(category ?? 'knowledge');
  const [categoryList] = useFlashCategoryList();
  const data = list.find(x => x.id === id);

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

  if (data == null) {
    return (
      <main>
        <Container width={720}>{''}</Container>
      </main>
    )
  }

  return (
    <main>
      <Container width={720}>
        <Stack.Horizontal>
          <Txt 
            style={{
            fontWeight: 'bold',
              fontSize: '20px',
              marginBottom: '16px'
            }}
          >
            {Object.entries(categoryList).find((x: any) => x?.[1] === category)?.[0]}
          </Txt>
          <Stack.Horizontal>
            {
              auth? (<>
                <TxtButton onClick={
                  async () => {
                    try {
                      await API.of(category).deleteItem(data.id);

                      router.push(`/?category=${category}`);
                    } catch (error:any) {
                      if (error.response.data.message === 'Not Allowed') {
                        router.push('/login');
                      }
                    }
                  }
                }>삭제</TxtButton>
              </>) : null
            }
          </Stack.Horizontal>
        </Stack.Horizontal>

        <TextArea.View 
          style={{ alignItems: 'flex-start' }} 
          value={data.body.contents} 
        />
        { auth ? <Form initialValue={data.body.contents} onSubmit={onSubmit}/> : null }
      </Container>
    </main>
  );
};
