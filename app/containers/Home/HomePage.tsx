'use client';

import { Suspense, useContext } from 'react';
import { Container } from '../../components/ui/Container';
import { Spacing } from '../../components/ui/Space';
import { Stack } from '../../components/ui/Stack';
import { AuthContext } from '../../providers';
import { Form } from './Form';
import { List } from './List';

export const HomePage = () => {
  const auth = useContext(AuthContext);

  return (
    <main>
      <Container width={720}>
        {
          auth ? (
            <Stack.Vertical align='right'>
              <Form />
              <Spacing size={20} />
            </Stack.Vertical>
          ) : null
        }

        <Suspense>
          <List />
        </Suspense>

      </Container>
    </main>
  );
};
