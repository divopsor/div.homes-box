'use client';

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { API } from "../api/index";

type Model = string;

export function useFlashList<T = any>(model?: Model) {
  const [list, refetch, isLoading, isFetching] = useList(model);
  const [flashList, setFlashList] = useState<T[]>([]);

  useEffect(() => {
    if (model == null) {
      return;
    }
    if (typeof window !== "undefined") {
      const list = JSON.parse(window?.localStorage?.getItem(
        `useFlashList-${model}`
      ) ?? '[]');

      setFlashList(list);
    }
  }, []);

  useEffect(() => {
    if (model == null || model === '' || Array.isArray(model)) {
      return;
    }

    if (list == null) {
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

  if (model == null) {
    return [[], () => {}, false, false] as [any[], () => void, boolean, boolean];
  }

  return [flashList, refetch, isLoading, isFetching] as const;
}

export function useList(model?: Model) {
  const {
    data: list,
    refetch,
    isLoading,
    isFetching,
  } = useQuery(
    ["fetchList", model],
    async () => {
      if (model == null) {
        return [];
      }

      const data = await API.of(model).readList();

      return data;
    },
    {
      initialData: [],
    }
  );

  return [list, refetch, isLoading, isFetching] as const;
}



export function useFlashCategoryList() {
  const [list, refetch, isLoading, isFetching] = useCategoryList();
  const [flashList, setFlashList] = useState<any>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const list = JSON.parse(window?.localStorage?.getItem(
        `useFlashCategoryList`
      ) ?? '[]');

      setFlashList(list);
    }
  }, []);

  useEffect(() => {
    if (list == null) {
      return;
    }

    if (typeof window !== "undefined") {
      window?.localStorage?.setItem(
        `useFlashCategoryList`,
        JSON.stringify(list)
      );
    }

    setFlashList(list);
  }, [list]);

  return [flashList, refetch, isLoading, isFetching] as const;
}

export function useCategoryList() {
  const {
    data: list,
    refetch,
    isLoading,
    isFetching,
  } = useQuery(
    ["useCategoryList"],
    API.getList,
    {
      initialData: [],
    }
  );

  return [list, refetch, isLoading, isFetching] as const;
}
