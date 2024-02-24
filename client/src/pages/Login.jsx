import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ phn: "", password: "" });
  const [loginButton, setLoginButton] = useState(false);
  const handleSubmitButtonState = () => {
    if (formData.phn.trim() !== "" && formData.password.trim() !== "") {
      setLoginButton(true);
    } else {
      setLoginButton(false);
    }
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });

    try {
  
      const response = await fetch('http://localhost:5000/api/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
  
    console.log(response);
  
    } catch (error) {
      console.log("Api coonection error",error);
  }
  };
  useEffect(() => {
    handleSubmitButtonState();
  }, [formData]);
  return (
    <section className="py-6 px-4">
      <div className="flex justify-center items-center my-2">
        <Link to="/">
          <FaChevronLeft className="absolute left-10 scale-150 text-muted-foreground" />
        </Link>
        <h1 className="text-center">Log in</h1>
      </div>
      <div className="py-10 px-4 drop-shadow-md space-y-10">
        <form
          action=""
          className="flex justify-center items-center flex-col space-y-6"
        >
          <div className="w-full space-y-2">
            <Label>Email</Label>
            <Input
              placeholder="Enter your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="w-full">
            <Label>Password</Label>
            <PasswordInput
              value={formData.password}
              onChange={(e) => handleChange(e)}
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
          <Button className="bg-accent text-black border w-full">
            <SiGmail className="mx-4 scale-150" />
            Continue with Email
          </Button>
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
      <div></div>
    </section>
  );
}

export default Login;
