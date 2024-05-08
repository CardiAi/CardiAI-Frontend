import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <ProtectedRoute>
      <main className=" min-h-screen flex flex-col w-screen">
        <Header />
        <div className="container flex flex-col flex-1">
          <Outlet />
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default AppLayout;
