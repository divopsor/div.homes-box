'use client';

import { Suspense, useContext } from 'react';
import { Container } from '../../components/ui/Container';
import { AuthContext } from '../../providers';
import { Form } from './Form';
import { List } from './List';

export const HomePage = () => {
  const auth = useContext(AuthContext);

  return (
    <main>
      <Container width={720}>
        <Suspense>
          <List />
        </Suspense>
        { auth ? <Form /> : null }
      </Container>
    </main>
  );
};
