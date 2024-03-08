import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleChange } from "@/helpers/handleChange";
import { handleSignUp } from "@/services/auth-services";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fn: "",
    phn: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [loginButton, setLoginButton] = useState(false);

  const [error, setError] = useState({
    phn_error: false,
    password_error: false,
  });

  const handleSubmitButtonState = () => {
    if (
      formData.fn.trim() !== "" &&
      formData.phn.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.cpassword.trim() !== ""
    ) {
      setLoginButton(true);
    } else {
      setLoginButton(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phn.length === 10) {
      setError({ ...error, phn_error: false });
    } else {
      setError({ ...error, phn_error: true });
    }

    if (formData.password === formData.cpassword) {
      setError({ ...error, password_error: false });
    } else setError({ ...error, password_error: true });

    handleSignUp(e, formData, dispatch, navigate);
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
        <h1 className="text-center">Sign Up</h1>
      </div>
      <div className="py-10 px-4 drop-shadow-md space-y-10">
        <form
          action=""
          className="flex justify-center items-center flex-col space-y-6"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="w-full space-y-2">
            <Label>Full name</Label>
            <Input
              placeholder="Enter your full name"
              type="text"
              name="fn"
              value={formData.fn}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>
          <div className="w-full space-y-2">
            <Label>Phone number</Label>
            <Input
              placeholder="Enter your phone number"
              type="number"
              name="phn"
              value={formData.phn}
              onChange={(e) => handleChange(e, setFormData)}
            />
            {error.phn_error && (
              <small className="text-primary">
                Mobile Number Must be of 10 digits
              </small>
            )}
          </div>
          <div className="w-full space-y-2">
            <Label>Email</Label>
            <Input
              placeholder="Enter your phone number"
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
          </div>
          <div className="w-full">
            <Label>Confirm Password</Label>
            <PasswordInput
              value={formData.cpassword}
              onChange={(e) => handleChange(e, setFormData)}
              name="cpassword"
            />
            {error.password_error && (
              <small className="text-primary text-left">
                Password must be matched
              </small>
            )}
            <p className="m-2">
              By clicking Sign up, you agree to the system's{" "}
              <span className="text-primary">Terms and policies</span>
            </p>
          </div>
          <Button
            className="w-full"
            variant={`${loginButton ? "" : "disabled"}`}
            disabled={!loginButton}
            type="submit"
          >
            Sign up
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
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-primary">Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Signup;
