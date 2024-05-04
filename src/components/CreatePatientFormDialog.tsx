import { Check, Plus } from "lucide-react";
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

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  age: z.coerce.number().int().positive(),
  gender: z.enum(["male", "female"]),
});

export default function CreatePatientFormDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: undefined,
      gender: "male",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
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
        <Button className="flex gap-1 bg-primary-blue items-center hover:bg-secondary-blue hover:text-primary-blue text-xs">
          <Plus size={18} />
          Add Patient
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
                    id="male"
                    type="radio"
                    value={"male"}
                    defaultChecked
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
                    type="radio"
                    value={"female"}
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
