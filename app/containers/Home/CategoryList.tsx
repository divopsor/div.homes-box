import { useRouter } from "next/navigation";
import { Txt } from "../../components/ui/Txt";
import { useCategoryList } from "../../hooks/useList";

export function CategoryList() {
  const [list] = useCategoryList();
  const router = useRouter();

  return (
    <>
      {
        Object.entries(list ?? []).map(([key, value]) => (
          <div style={{ cursor: 'pointer' }} key={key} onClick={() => {
            router.push(`/?category=${value}`);
          }}>
            <Txt style={{ textAlign: 'center', fontSize: '2.4rem', fontWeight: 'bold' }}>
              {`👉 ${key} 보러가기`}
            </Txt>
          </div>
        ))
      }
    </>
  )
}

/**
import Link from "next/link";
import { Txt } from "../../components/ui/Txt";
import { useCategoryList } from "../../hooks/useList";

export function CategoryList() {
  const [list] = useCategoryList();

  return (
    <>
      {
        Object.entries(list ?? []).map(([key, value]) => (
          <Link href={`/?category=${value}`} key={value as string}>
            <Txt style={{ textAlign: 'center', fontSize: '2.4rem', fontWeight: 'bold' }}>
              {`👉 ${key} 보러가기`}
            </Txt>
          </Link>
        ))
      }
    </>
  )
}
 */
