import { FaHamburger } from "react-icons/fa";
import { FcMenu } from "react-icons/fc";
import logo from "@/assets/logo2.png";
import { VscBell } from "react-icons/vsc";
import { SlHandbag } from "react-icons/sl";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSidebar } from "@/store/reducers/sidebarSlice";

function Navbar() {
  const dispatch = useDispatch();
  return (
    <nav className=" fixed w-full z-20 bg-white flex justify-between items-center p-5 py-3 shadow-md">
      <div className="flex items-center justify-center space-x-4">
        <FcMenu
          className="text-black text-4xl "
          role="button"
          onClick={() => dispatch(setSidebar(true))}
        />
        <img src={logo} alt="" className="w-20 h-full" />
      </div>
      <div className="flex items-center justify-center space-x-3 text-2xl">
        <Link to={"/notification"}>
          <VscBell />
        </Link>
        <Link to={"/cart"}>
          <SlHandbag />
        </Link>
        <Link to={"/login"}>
          <Button>Login</Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
