'use client';

import Link from "next/link";
import { Txt } from "../../components/ui/Txt";
import { useFlashCategoryList } from "../../hooks/useList";

export function CategoryList() {
  const [list] = useFlashCategoryList();

  return (
    <>
      {
        Object.entries(list ?? []).map(([key, value]) => (
          <Link href={`/home/?category=${value}`} key={value as string}>
            <Txt style={{ textAlign: 'center', fontSize: '2.4rem', fontWeight: 'bold' }}>
              {`👉 ${key} 보러가기`}
            </Txt>
          </Link>
        ))
      }
    </>
  )
}

