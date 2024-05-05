import { getPatients } from "@/http";
import { useQuery } from "@tanstack/react-query";

export function usePatientsData(page: number = 1) {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getPatients(page),
    queryKey: ["patients", page],
  });
  return { data, isLoading, isError, error };
}
