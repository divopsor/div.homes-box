import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { API } from "../api/index";

type Model = string;

export function useFlashList<T = any>(model: Model) {
  const [list, refetch, isLoading, isFetching] = useList(model);
  const [flashList, setFlashList] = useState<T[]>([]);

  useEffect(() => {
    if (list == null) {
      return;
    }

    if (list.length === 0) {
      return;
    }

    if (typeof window !== "undefined") {
      window?.localStorage?.setItem(
        `useFlashList-${model}`,
        JSON.stringify(list)
      );
    }

    setFlashList(list);
  }, [list]);

  return [flashList, refetch, isLoading, isFetching] as const;
}

export function useList(model: Model) {
  const {
    data: list,
    refetch,
    isLoading,
    isFetching,
  } = useQuery(
    ["fetchList", model],
    async () => {
      const data = await API.of(model).readList();

      return data;
    },
    {
      initialData: [],
    }
  );

  return [list, refetch, isLoading, isFetching] as const;
}