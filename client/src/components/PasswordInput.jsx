import React, { useState } from "react";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = React.forwardRef((field, ref) => {
  const [eye, setEye] = useState({
    icon: false,
    type: "password",
  });
  return (
    <div className="relative">
      <Input
        placeholder="Enter your password"
        type={eye.type}
        {...field}
        ref={ref}
      />
      {eye.icon ? (
        <Eye
          className="absolute top-3 right-3 text-accent-foreground/40 scale-75"
          onClick={() => setEye({ icon: false, type: "password" })}
        />
      ) : (
        <EyeOff
          className="absolute top-3 right-3 text-accent-foreground/40 scale-75"
          onClick={() => setEye({ icon: true, type: "text" })}
        />
      )}
    </div>
  );
});

PasswordInput.defaultProps = {
  name: "password",
};
export default PasswordInput;
