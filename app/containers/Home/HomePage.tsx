'use client';

import { Suspense } from 'react';
import { Container } from '../../components/ui/Container';
import { List } from './List';

export const HomePage = () => {
  return (
    <main>
      <Container width={720}>
        <Suspense>
          <List />
        </Suspense>
      </Container>
    </main>
  );
};
