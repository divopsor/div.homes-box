import type { NextPage } from "next";
import Link from "next/link";
import { Spacing } from "../../components/ui/Space";
import { Txt } from "../../components/ui/Txt";

export const MainPage: NextPage = () => {

  return (
    <main>
      <Spacing size={30} />
      <Link href="/e396a261fcaa122a6544de06f8b74653">
        <Txt css={{ textAlign: 'center' }}>Work 보러가기</Txt>
      </Link>
    </main>
  );
};
