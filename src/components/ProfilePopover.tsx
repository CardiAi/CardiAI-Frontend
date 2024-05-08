import { Button } from "./ui/button";
import { useLogout } from "@/hook/useLogout";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/hook/useStore";
import { logout } from "@/store/userSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { User } from "lucide-react";
import { useAppSelector } from "@/hook/useStore";
import { userState } from "@/store/userSlice";
import { useQueryClient } from "@tanstack/react-query";

function ProfilePopover() {
  const { mutate, isPending } = useLogout();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: { user: userState | null }) => state.user
  );
  return (
    <Popover>
      <Button
        className="rounded-full text-white hover:bg-slate-200/25 hover:text-gray-800 transition-all duration-500"
        asChild
        size={"icon"}
        variant={"ghost"}
      >
        <PopoverTrigger>
          <User size={18} />
        </PopoverTrigger>
      </Button>
      <PopoverContent className="max-w-40">
        <div className="flex flex-col items-center">
          <p className="font-bold">{user && user.name}</p>
          <p className="text-xs">{user && user.email}</p>
        </div>
        <Button
          className=" block mx-auto mt-5"
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
                queryClient.removeQueries({ queryKey: ["user"] });
                dispatch(logout());
              },
            });
          }}
          variant={"destructive"}
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default ProfilePopover;
