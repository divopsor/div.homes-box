'use client';

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import { API } from "../api/index";

type Model = string;

export function useFlashItem(model: Model, id: string) {
  const [list, refetch] = useList(model);
  const data = list.find((x: any) => x.id === id);

  return [data, refetch];
}

export function useFlashList<T = any>(model: Model, parentId?: string) {
  const [originList, refetch, isLoading, isFetching] = useList(model);
  const [flashList, setFlashList] = useState<T[]>([]);
  const list = useMemo(() => originList.filter((x: any) => parentId != null ? x.body.parentId === parentId : x.body.parentId == null), [originList, parentId]);

  useEffect(() => {
    if (model == null) {
      return;
    }
    if (typeof window !== "undefined") {
      const list = JSON.parse(window?.localStorage?.getItem(
        `useFlashList-${model}-${parentId ?? 'parent'}`
      ) ?? '[]');

      setFlashList(list);
    }
  }, []);

  useEffect(() => {
    if (model == null || model === '' || Array.isArray(model)) {
      return;
    }

    if (list == null || list.length === 0) {
      return;
    }

    if (typeof window !== "undefined") {
      window?.localStorage?.setItem(
        `useFlashList-${model}-${parentId ?? 'parent'}`,
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
      try {

        const data = await API.of(model).readList();
        
        return data;
      } catch (error:any) {
        if (error.response?.data?.message === "Not Allowed") {
          window.location.href = '/box';
          return;
        }

        alert(error.message);
      }
    },
    {
      initialData: [],
    }
  );

  return [list, refetch, isLoading, isFetching] as const;
}



export function useFlashCategoryList() {
  const [list, refetch, isLoading, isFetching] = useCategoryList();
  const [flashList, setFlashList] = useState<any>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const list = JSON.parse(window?.localStorage?.getItem(
        `useFlashCategoryList`
      ) ?? '{}');

      setFlashList(list);
    }
  }, []);

  useEffect(() => {
    if (list == null || Object.keys(list).length === 0) {
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
      initialData: {},
    }
  );

  return [list, refetch, isLoading, isFetching] as const;
}
