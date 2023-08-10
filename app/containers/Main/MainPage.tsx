'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Spacing } from "../../components/ui/Space";
import { Txt } from "../../components/ui/Txt";
import { HomePage } from "../Home/HomePage";

export const MainPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  
  if (category == null || Array.isArray(category) || category === '') {
    return (
      <main>
        <Spacing size={30} />
        <Link href="/?category=e396a261fcaa122a6544de06f8b74653">
          <Txt style={{ textAlign: 'center' }}>Work 보러가기</Txt>
        </Link>
      </main>
    );
  }

  return <HomePage category={'work'} />
};
