import { useAppSelector } from "@/hook/useStore";
import { ReactNode } from "react";

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useAppSelector((state) => state.user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
