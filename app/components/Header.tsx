'use client';

import { Header as Wrapper } from '@divops-packages/ui';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  return (
    <Wrapper>
      <div
        style={{
          cursor: 'pointer',
          height: '48px',
        }}
        onClick={() => {
          router.push('/');
        }}
      >
        <span 
          style={{
            fontSize: '36px',
            fontFamily: 'monospace',
          }}
        >
          📦 div.homes/box
        </span>
      </div>
    </Wrapper>
  )
}
