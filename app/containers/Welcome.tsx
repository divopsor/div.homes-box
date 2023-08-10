'use client';

import { Spacing } from "../components/ui/Space";
import { Txt } from "../components/ui/Txt";

export function Welcome() {
  return (
    <main>
      <Spacing size={30} />

      <Txt>환영합니다, 로그인을 하여 GTD를 시작해보세요!</Txt>
    </main>
  );
}
