import { useGetUserData } from "@/hook/useGetUserData";

import { ReactNode } from "react";
import Loader from "./Loader";

function AuthCheck({ children }: { children: ReactNode }) {
  const { isLoading } = useGetUserData();
  if (isLoading) return <Loader />;

  return <>{children}</>;
}

export default AuthCheck;
