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
import { loginFormSchema as formSchema } from "@/schemas";
import { useLogin } from "@/hook/useLogin";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hook/useStore";
import { storeUser } from "@/store/userSlice";
function Login() {
  const user = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  function onSubmit(data: z.infer<typeof formSchema>) {
    const loadingToast = toast.loading("Signing in...");
    mutate(data, {
      onSuccess(data) {
        toast.success("Login successful", { id: loadingToast });
        dispatch(storeUser(data));
        navigate("/");
      },
      onError(error) {
        toast.error(error.message, { id: loadingToast });
      },
    });
  }
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <main className="p-2 md:px-8 md:py-5 lg:px-14 lg:py-7 min-h-screen flex flex-col items-center gap-4">
      <img
        src="/Logo.svg"
        alt="Logo"
        className="md:w-[200px] md:h-[62px] object-cover self-start"
      />

      <div className="flex flex-col flex-1 space-y-7 w-full max-w-80">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-bold text-4xl">Login</h1>
          <p className="text-xl">Welcome back to CardiAI</p>
        </div>
        <Form {...form}>
          <form
            className="flex flex-col h-full gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-3">
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
                        disabled={isPending}
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
            </div>
            <div className="flex flex-col gap-4">
              <Button
                disabled={isPending}
                className="bg-primary-blue hover:bg-primary-blue"
              >
                {" "}
                Login
              </Button>
              <Separator className="bg-[#726C6C] flex items-center justify-center before:content-['or'] before:bg-white before:px-1" />
              <Button
                type="button"
                disabled={isPending}
                asChild
                className="bg-secondary-blue hover:bg-secondary-blue text-primary-blue"
              >
                <Link to={"/signup"}>Sign up</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default Login;
