import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleLogin } from "@/services/auth-services";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleChange } from "@/helpers/handleChange";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginButton, setLoginButton] = useState(false);

  const handleSubmitButtonState = () => {
    if (formData.email.trim() !== "" && formData.password.trim() !== "") {
      setLoginButton(true);
    } else {
      setLoginButton(false);
    }
  };

  useEffect(() => {
    handleSubmitButtonState();
  }, [formData]);
  return (
    <section>
      <div className="flex justify-center items-center shadow-md py-6">
        <Link to="/" className="flex justify-center items-center">
          <FaChevronLeft className="absolute left-10 scale-150 text-muted-foreground" />
        </Link>
        <h1 className="text-center">Log in</h1>
      </div>
      <div className="py-2 px-4">
        <div className="py-10 px-4 drop-shadow-md space-y-10">
          <form
            action=""
            className="flex justify-center items-center flex-col space-y-6"
            onSubmit={(e) => handleLogin(e, formData, dispatch, navigate)}
          >
            <div className="w-full space-y-2">
              <Label>Email</Label>
              <Input
                placeholder="Enter your Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e, setFormData)}
              />
            </div>
            <div className="w-full">
              <Label>Password</Label>
              <PasswordInput
                value={formData.password}
                onChange={(e) => handleChange(e, setFormData)}
              />
              <small className="text-primary">Forgot password?</small>
            </div>
            <Button
              className="w-full"
              variant={`${loginButton ? "" : "disabled"}`}
              disabled={!loginButton}
            >
              Log in
            </Button>
          </form>
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
