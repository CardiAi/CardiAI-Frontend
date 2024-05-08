import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useDeletePatient } from "@/hook/useDeletePatient";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function DeletePatientDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const { mutate, isPending } = useDeletePatient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  function handleDelete() {
    const myToast = toast.loading("Deleting user...");
    mutate(undefined, {
      onSuccess: () => {
        toast.success("User deleted successfully.", { id: myToast });
        queryClient.invalidateQueries({ queryKey: ["patients"] });
        navigate("/", { replace: true });
      },
      onError: () => toast.error("Failed to delete user", { id: myToast }),
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant="destructive">
          <Trash size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this patient?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user
            from the system.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button disabled={isPending} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="mb-4 sm:mb-0"
            onClick={handleDelete}
            disabled={isPending}
            variant={"destructive"}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeletePatientDialog;
