import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleLogin } from "@/services/auth-services";
import { FaChevronLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/authSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  function onSubmit(values) {
    handleLogin(values, dispatch, navigate, setError);
  }

  return (
    <section>
      <div className="flex justify-center items-center shadow-md py-6">
        <Link to="/" className="flex justify-center items-center">
          <FaChevronLeft className="absolute left-10 scale-150 text-muted-foreground" />
        </Link>
        <h1 className="text-center">Log in</h1>
      </div>
      <div className="py-2 px-4">
        <div className="py-10 max-w-[450px] m-auto px-4 drop-shadow-md space-y-10">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <small className="text-primary">Forgot password?</small>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Log in"}
              </Button>
              {errors.root && (
                <p className=" text-red-500 text-center mt-0">
                  {errors.root.message}
                </p>
              )}
            </form>
          </Form>
          <div className="flex justify-between items-center w-full">
            <hr className="w-[40%]" />
            <p>or</p>
            <hr className="w-[40%]" />
          </div>
          <div className="text-center space-y-3">
            {/* <Button className="bg-accent text-black border w-full">
            <SiGmail className="mx-4 scale-150" />
            Continue with Email
          </Button> */}
            <Button className="bg-[#5384EE] w-full">
              <FcGoogle className="mx-4 scale-150" />
              Continue with Google
            </Button>
            <p>
              Do not have an account?{" "}
              <Link to="/signup">
                <span className="text-primary">Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
