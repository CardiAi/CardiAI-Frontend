import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
const formSchema = z
  .object({
    name: z.string().min(3, { message: "The name must be 3 letters at least" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),

    passwordConfirm: z.string().min(8, { message: "Passwords do not match" }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (
      !(
        password.match(/[A-Z]/g) &&
        password.match(/[a-z]/g) &&
        password.match(/[0-9]/g)
      )
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message:
          "Password must contain at least one uppercase character, one lowercase character, and one number",
      });
    } else if (password.match(/[^A-Za-z0-9]/g)) {
      ctx.addIssue({
        path: ["password"],
        code: "custom",
        message: "Password should not contain special characters",
      });
    } else if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: "Passwords do not match",
      });
    }
  });
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      passwordConfirm: "",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
    <main className="p-2 md:px-8 md:py-5 lg:px-14 lg:py-7 min-h-screen flex flex-col items-center gap-4">
      <img
        src="/Logo.svg"
        alt="Logo"
        className="w-[200px] h-[62px] object-cover self-start"
      />

      <div className="flex flex-col flex-1 space-y-7 w-full max-w-80">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-bold text-4xl">Sign up</h1>
          <p className="text-xl">Create account on cardiAI</p>
        </div>
        <Form {...form}>
          <form
            className="flex flex-col h-full gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full"
                        placeholder="Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full"
                        placeholder="Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <label className="flex items-center border pr-2">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full border-none"
                          placeholder="Password"
                          {...field}
                        />
                        <Eye
                          className="hover:text-primary-blue cursor-pointer"
                          onClick={() => setShowPassword((prev) => !prev)}
                        />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <label className="flex items-center border pr-2">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none w-full border-none"
                          placeholder="Confirm Password"
                          {...field}
                        />
                        <Eye
                          className="hover:text-primary-blue cursor-pointer"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Button className="bg-primary-blue hover:bg-primary-blue">
                {" "}
                Sign up
              </Button>
              <Separator className="bg-[#726C6C] flex items-center justify-center before:content-['or'] before:bg-white before:px-1" />
              <Button
                type="button"
                asChild
                className="bg-secondary-blue hover:bg-secondary-blue text-primary-blue"
              >
                <Link to={"/login"}>Login</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default Signup;
