import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
