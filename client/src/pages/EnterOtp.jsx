import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

import OtpDialog from "@/components/OtpDialog";

function EnterOtp() {
  const [formData, setFormData] = useState({
    i1: "",
    i2: "",
    i3: "",
    i4: "",
    i5: "",
    i6: "",
  });
  const [loginButton, setLoginButton] = useState(false);
  const handleSubmitButtonState = () => {
    if (
      formData.i1.trim() !== "" &&
      formData.i2.trim() !== "" &&
      formData.i3.trim() !== "" &&
      formData.i4.trim() !== "" &&
      formData.i5.trim() !== "" &&
      formData.i6.trim() !== ""
    ) {
      setLoginButton(true);
    } else {
      setLoginButton(false);
    }
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    try {
      const response = await fetch("/api/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(response);
    } catch (error) {
      console.log("Api coonection error", error);
    }
  };
  const [counter, setCounter] = useState(60);
  const decrement = () => {
    setCounter(counter - 1);
  };
  useEffect(() => {
    const intervalId = setInterval(decrement, 100); // Increment count every second
    handleSubmitButtonState();
    return () => {
      clearInterval(intervalId);
    };
  }, [formData]);
  return (
    <section>
      <div className="flex justify-center items-center py-6 shadow-md ">
        <Link to="/" className="flex justify-center items-center">
          <FaChevronLeft className="absolute left-10 scale-150 text-muted-foreground" />
        </Link>
        <h1 className="text-center">Enter OTP</h1>
      </div>
      <div className="py-2 px-4">
        <div className="py-10 max-w-[450px] m-auto px-4 drop-shadow-md space-y-10">
          <form
            action=""
            className="flex justify-center items-center flex-col space-y-8"
          >
            <div className="w-full space-y-8">
              <h2 className="text-center">Enter the confirmation code</h2>
              <div className="grid grid-flow-col gap-4">
                <Input
                  type="number"
                  name="i1"
                  className="font-bold text-xl"
                  value={formData.i1}
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  type="number"
                  name="i2"
                  className="font-bold text-xl"
                  value={formData.i2}
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  type="number"
                  name="i3"
                  className="font-bold text-xl"
                  value={formData.i3}
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  type="number"
                  name="i4"
                  className="font-bold text-xl"
                  value={formData.i4}
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  type="number"
                  name="i5"
                  className="font-bold text-xl"
                  value={formData.i5}
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  type="number"
                  name="i6"
                  className="font-bold text-xl"
                  value={formData.i6}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="text-center space-y-6 w-4/5 m-auto">
                <p className="text-[14px]">
                  Verification code has been sent to your mail
                  <span className="text-primary"> someone@gmail.com</span>
                </p>
                <p className="text-[14px]">
                  Haven't received the code yet?{" "}
                  <span className="text-primary">
                    {`Resend (${counter} seconds)`}
                  </span>
                </p>
              </div>
            </div>
            <OtpDialog>
              <Button
                className="w-full"
                variant={`${loginButton ? "" : "disabled"}`}
                disabled={!loginButton}
              >
                Continue
              </Button>
            </OtpDialog>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EnterOtp;
