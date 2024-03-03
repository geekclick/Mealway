import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function OtpDialog({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle>Registered Successfully</DialogTitle>
        </DialogHeader>
        <FaCheckCircle className="text-primary scale-150 w-full" />
        <p className="text-primary w-full">someone@gmail.com</p>
        <p className="w-11/12">Your email has been successfully registered</p>
        <Button>
          <Link to={"/"}>Continue on hompage</Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default OtpDialog;
