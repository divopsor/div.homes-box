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
  return (
    <main>
      <Container width={720}>
        <Stack.Vertical align='right'>
          <Suspense>
            <Form />
          </Suspense>
        </Stack.Vertical>

        <Spacing size={20} />

        <Suspense>
          <List />
        </Suspense>

      </Container>
    </main>
  );
};
