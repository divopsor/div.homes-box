'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { Spacing } from '../../components/ui/Space';
import { Stack } from '../../components/ui/Stack';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useCategoryList } from '../../hooks/useList';
import { Form } from './Form';
import { List } from './List';

export const HomePage = () => {
  const isMounted = useIsMounted();
  const [list] = useCategoryList();
  const searchParams = useSearchParams();
  const category = searchParams.get('category')!;
  const router = useRouter();

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (category == null || category === '' || category === 'undefined') {
      router.push(`/?category=${Object.values(list)[0]}`);
    }
  }, [isMounted, category, list])

  return (
    <main>
      <Container width={720}>
        <Stack.Vertical align='right'>
          <Suspense>
            <Form category={category} />
          </Suspense>
        </Stack.Vertical>

        <Spacing size={20} />

        <Suspense>
          <List category={category} />
        </Suspense>

      </Container>
    </main>
  );
};
