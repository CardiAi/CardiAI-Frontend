import { createPatient } from "@/http";
import { useMutation } from "@tanstack/react-query";

export function useCreatePatient() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createPatient,
  });
  return { mutate, isPending, isError, error };
}
