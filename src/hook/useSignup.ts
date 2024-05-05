import { signup } from "@/http";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signup,
  });
  return { mutate, isPending, isError, error };
}
