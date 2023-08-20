'use client';

import { Suspense } from 'react';
import { Container } from '../../components/ui/Container';
import { Spacing } from '../../components/ui/Space';
import { Stack } from '../../components/ui/Stack';
import { List } from './List';
import { Sidebar } from './Sidebar';

export const HomePage = () => {
  return (
    <>
      <Spacing size={60} />
      <Stack.Horizontal style={{
        gap: '100px',
        alignItems: 'flex-start'
      }}>
        <Stack.Vertical style={{
          width: '120px',
        }}>
          <Sidebar />
        </Stack.Vertical>

        <Stack.Vertical>

        <main>
            <Container width={720}>
              <Suspense>
                <List />
              </Suspense>
            </Container>
          </main>
        </Stack.Vertical>
      </Stack.Horizontal>
    </>
  );
};