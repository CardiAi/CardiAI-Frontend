import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLogout } from "@/hook/useLogout";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/hook/useStore";
import { logout } from "@/store/userSlice";

function Header() {
  const { mutate, isPending } = useLogout();
  const dispatch = useAppDispatch();
  return (
    <header className=" bg-primary-blue sticky top-0 z-50">
      <div className="container py-2 flex items-center justify-between">
        <Link to={"/"}>
          <img src="/Logo.svg" className="brightness-0 invert" alt="Logo" />
        </Link>
        {/* User Box */}
        {/* <div className="size-7 cursor-pointer hover:bg-white/40 transition duration-500 rounded-full bg-white/15 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]" /> */}
        <Button
          disabled={isPending}
          onClick={() => {
            const logoutToast = toast.loading("Logging Out...");
            mutate(undefined, {
              onError() {
                toast.error("An Error Occured While Logging Out", {
                  id: logoutToast,
                });
              },
              onSuccess() {
                toast.success("Logged Out Successfully", { id: logoutToast });
                sessionStorage.removeItem("token");
                dispatch(logout());
              },
            });
          }}
          variant={"destructive"}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Header;
