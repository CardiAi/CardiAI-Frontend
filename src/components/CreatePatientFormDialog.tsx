import { Check, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./ui/label";
import { useState } from "react";
import { patientSchema as formSchema } from "@/schemas";
import { useCreatePatient } from "@/hook/useCreatePatient";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function CreatePatientFormDialog({
  isEditing,
  patient,
}: {
  isEditing?: boolean;
  patient?: z.infer<typeof formSchema>;
}) {
  const { patientID } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate, isPending } = useCreatePatient();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: isEditing ? patient?.name : "",
      age: isEditing ? patient?.age : 0,
      gender: isEditing ? patient?.gender : "male",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    const submitToast = toast.loading("Creating patient...");
    mutate(
      { ...data, isEditing, patientID },
      {
        onSuccess: (data) => {
          toast.success(
            isEditing
              ? "Patient edited successfully..."
              : "Patient created successfully",
            {
              id: submitToast,
            }
          );
          queryClient.invalidateQueries({
            queryKey: ["patients"],
          });
          queryClient.setQueryData(["patient", `${data.id}`], data);
          if (isEditing) {
            queryClient.invalidateQueries({
              queryKey: ["patient", patientID],
            });
          }
          if (!isEditing) {
            navigate(`/patient/${data.id}`);
            form.reset();
          }
          setIsOpen(false);
        },
        onError(error) {
          toast.error(error.message, { id: submitToast });
        },
      }
    );
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button
          size={isEditing ? "icon" : "default"}
          className="flex gap-1 bg-primary-blue items-center hover:bg-secondary-blue hover:text-primary-blue text-xs"
        >
          {isEditing ? (
            <Edit size={18} />
          ) : (
            <>
              <Plus size={18} />
              Add Patient
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Age"
                      type="number"
                      step={1}
                      min={0}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div className="flex items-center justify-center border rounded-full overflow-hidden  mx-auto max-w-52 w-full text-[#563F14]">
                <Label
                  htmlFor="male"
                  className="has-[input:checked]:bg-[#EFDEBC] w-1/2 text-center h-10 leading-10 flex items-center justify-center gap-2 px-3 cursor-pointer border-r"
                >
                  {form.getValues().gender === "male" && <Check size={16} />}
                  <Input
                    disabled={isPending}
                    id="male"
                    type="radio"
                    value={"male"}
                    checked={form.getValues().gender === "male"}
                    className="hidden"
                    {...form.register("gender")}
                  />
                  Male
                </Label>
                <Label
                  className="has-[input:checked]:bg-[#EFDEBC] w-1/2 text-center h-10 leading-10  flex items-center justify-center  px-3 gap-2 cursor-pointer"
                  htmlFor="female"
                >
                  <Input
                    disabled={isPending}
                    type="radio"
                    value={"female"}
                    checked={form.getValues().gender === "female"}
                    className="hidden"
                    id="female"
                    {...form.register("gender")}
                  />
                  Female
                  {form.getValues().gender === "female" && (
                    <Check color="#563F14" size={16} />
                  )}
                </Label>
              </div>
            </div>
            <Button
              disabled={isPending}
              className="w-full bg-primary-blue hover:bg-secondary-blue hover:text-primary-blue"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
