import { logout } from "@/http";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
  });
  return { mutate, isPending };
}
