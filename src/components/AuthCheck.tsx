import { useGetUserData } from "@/hook/useGetUserData";

import { ReactNode } from "react";

function AuthCheck({ children }: { children: ReactNode }) {
  const { isLoading } = useGetUserData();
  if (isLoading) return null;

  return <>{children}</>;
}

export default AuthCheck;
