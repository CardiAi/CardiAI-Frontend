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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signupFormSchema as formSchema } from "@/schemas";
import { useSignup } from "@/hook/useSignup";
import toast from "react-hot-toast";
import { useAppSelector } from "@/hook/useStore";
function Signup() {
  const user = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate, isPending } = useSignup();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      passwordConfirm: "",
    },
  });
  const navigate = useNavigate();
  function onSubmit(data: z.infer<typeof formSchema>) {
    const signupToast = toast.loading("Signing up...");
    mutate(data, {
      onSuccess: () => {
        toast.success("Signup successful", { id: signupToast });
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error.message, { id: signupToast });
      },
    });
  }
  if (user) return <Navigate to="/" />;
  return (
    <main className="p-2 md:px-8 md:py-5 lg:px-14 lg:py-7 min-h-screen flex flex-col items-center gap-4">
      <img
        src="/Logo.svg"
        alt="Logo"
        className="md:w-[200px] md:h-[62px] object-cover self-start"
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
                        disabled={isPending}
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
                        disabled={isPending}
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
                          disabled={isPending}
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
                          disabled={isPending}
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
              <Button
                disabled={isPending}
                className="bg-primary-blue hover:bg-primary-blue"
              >
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
