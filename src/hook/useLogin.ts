import { login } from "@/http";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
  });
  return { mutate, isPending, isError, error };
}
