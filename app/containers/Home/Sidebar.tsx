'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Txt } from "../../components/ui/Txt";
import { useCategoryList } from "../../hooks/useList";

export function Sidebar() {
  const [list] = useCategoryList();
  const searchParams = useSearchParams();
  const category = searchParams.get('category')!;

  return (
    <div style={{
      display: 'inline-block'
    }}>
      <ul>{
        (Object.entries(list) ?? []).map((x:any) => (
          <li key={x[1]}>
            <Link href={`?category=${x[1]}`}>
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