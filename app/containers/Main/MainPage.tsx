'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Spacing } from "../../components/ui/Space";
import { Txt } from "../../components/ui/Txt";
import { Category } from "../../constants";
import { HomePage } from "../Home/HomePage";

export const MainPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  
  if (category == null || Array.isArray(category) || category === '') {
    return (
      <main>
        <Spacing size={30} />
        {
          Object.entries(Category).map(([key, value]) => (
            <Link href={`/?category=${value}`} key={value}>
              <Txt style={{ textAlign: 'center' }}>{key} 보러가기</Txt>
            </Link>
          ))
        }
      </main>
    );
  }

  return <HomePage category={category} />
};
