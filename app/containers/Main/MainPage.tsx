'use client';

import { useSearchParams } from "next/navigation";
import { Spacing } from "../../components/ui/Space";
import { CategoryList } from "../Home/CategoryList";
import { HomePage } from "../Home/HomePage";

export const MainPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  
  if (category == null || Array.isArray(category) || category === '') {
    return (
      <main>
        <Spacing size={30} />
        <CategoryList />
      </main>
    );
  }

  return <HomePage category={category} />
};
