import { getUserData } from "@/http";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "./useStore";

export function useGetUserData() {
  const user = useAppSelector((state) => state.user);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !user,
    retry: 0,
  });

  return { data, isLoading, isError };
}
