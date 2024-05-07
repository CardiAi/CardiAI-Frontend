import { getPatients } from "@/http";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function usePatientsData(page: number = 1) {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getPatients(page),
    queryKey: ["patients", page],
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (page === 1) {
      queryClient.prefetchQuery({
        queryKey: ["patients", page + 1],
        queryFn: () => getPatients(page + 1),
      });
    } else {
      if (data?.meta?.last_page > page) {
        queryClient.prefetchQuery({
          queryKey: ["patients", page + 1],
          queryFn: () => getPatients(page + 1),
        });
      }

      queryClient.prefetchQuery({
        queryKey: ["patients", page - 1],
        queryFn: () => getPatients(page - 1),
      });
    }
  }, [page, data?.meta?.last_page, queryClient]);
  return { data, isLoading, isError, error };
}
