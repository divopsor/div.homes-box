'use client';

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { API } from "../../api/gist";
import { Txt } from "../../components/ui/Txt";
import { useFlashCategoryList } from "../../hooks/useList";
import { useMetaKeyShortcut } from "../../hooks/useMetaKeyShortcut";

export function Sidebar() {
  const router = useRouter();
  const [list] = useFlashCategoryList();
  const searchParams = useSearchParams();
  const category = searchParams.get('category')!;

  const goCategory = async (no: number) => {
    const list = await API.getList();
    const category = Object.entries(list)?.[no - 1]?.[1];

    if (category != null) {
      router.replace(`?category=${category}`);
    }
  }

  useEffect(() => {
    if (category == null && Object.entries(list).length > 0) {
      router.replace(`?category=${Object.entries(list)[0][1]}`)
    }
  }, [category, list]);

  useMetaKeyShortcut({
    ...(new Array(9)).fill(0).reduce((acc, _, index) => {
      return {
        ...acc,
        [index]: () => goCategory(index),
      }
    }, {}),
  });

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