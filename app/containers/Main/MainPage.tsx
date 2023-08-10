'use client';

import Link from "next/link";
import { Spacing } from "../../components/ui/Space";
import { Txt } from "../../components/ui/Txt";
import { HomePage } from "../Home/HomePage";

export const MainPage = ({ searchParams }: { searchParams: Record<string, string>}) => {
  const { category } = searchParams;

  if (category == null || Array.isArray(category)) {
    return (
      <main>
        <Spacing size={30} />
        <Link href="/?category=e396a261fcaa122a6544de06f8b74653">
          <Txt css={{ textAlign: 'center' }}>Work 보러가기</Txt>
        </Link>
      </main>
    );
  }

  return <HomePage category={category} />
};
