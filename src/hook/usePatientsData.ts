import { getPatients } from "@/http";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function usePatientsData(page: number = 1, search: string = "") {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getPatients(page, search),
    queryKey: ["patients", page, search],
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (page === 1 && data?.meta?.last_page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["patients", page + 1, search],
        queryFn: () => getPatients(page + 1, search),
      });
    } else {
      if (data?.meta?.last_page > page) {
        queryClient.prefetchQuery({
          queryKey: ["patients", page + 1, search],
          queryFn: () => getPatients(page + 1, search),
        });
      }

      queryClient.prefetchQuery({
        queryKey: ["patients", page - 1, search],
        queryFn: () => getPatients(page - 1, search),
      });
    }
  }, [page, data?.meta?.last_page, queryClient, search]);
  return { data, isLoading, isError, error };
}
