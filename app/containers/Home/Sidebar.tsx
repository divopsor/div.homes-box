'use client';

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Txt } from "../../components/ui/Txt";
import { useFlashCategoryList } from "../../hooks/useList";

export function Sidebar() {
  const router = useRouter();
  const [list] = useFlashCategoryList();
  const searchParams = useSearchParams();
  const category = searchParams.get('category')!;

  useEffect(() => {
    if (category == null && Object.entries(list).length > 0) {
      router.push(`?category=${Object.entries(list)[0][1]}`)
    }
  }, [category, list])

  return (
    <div style={{
      display: 'inline-block'
    }}>
      <ul>{
        (Object.entries(list) ?? []).map((x:any) => (
          <li key={x[1]}>
            <Link href={`/?category=${x[1]}`} as={`/?category=${x[1]}`}>
              <Txt style={{
                fontWeight: x[1] === category ? 'bold' : 'unset',
                textDecoration: x[1] === category ? 'underline' : 'unset',
                fontSize: '2rem',
                width: '100px'
              }}>
                {x[0]}
              </Txt>
            </Link>
          </li>
        ))
      }</ul>
    </div>
  );
}