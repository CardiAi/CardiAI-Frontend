import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Icon from "../assets/Diagnosis Button Icon.svg";
import AddDiagnosisForm from "./AddDiagnosisForm";
import { useState } from "react";
function CreateDiagnosisFormDialog() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button className="hover:bg-primary-blue text-[#003A5A]" asChild>
        <DialogTrigger className="fixed bottom-5 right-5 bg-secondary-blue text-[#003A5A] shadow-xl hover:bg-primary-blue hover:text-white group flex items-center gap-1">
          <img
            src={Icon}
            className=" group-hover:brightness-0 group-hover:invert"
            alt="icon"
          />
          Start Diagnosis
        </DialogTrigger>
      </Button>
      <DialogContent className="py-8 px-2">
        <AddDiagnosisForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateDiagnosisFormDialog;
