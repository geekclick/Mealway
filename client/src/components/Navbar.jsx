import { RiMenu2Fill } from "react-icons/ri";
import { FcMenu } from "react-icons/fc";
import logo from "@/assets/logo2.png";
import { VscBell } from "react-icons/vsc";
import { SlHandbag } from "react-icons/sl";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "@/store/reducers/sidebarSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setIsLoggedIn } from "@/store/reducers/authSlice";
import { IoCallOutline } from "react-icons/io5";

function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  return (
    <nav className=" fixed w-full z-20 bg-white flex justify-between items-center p-5 py-3 shadow-md">
      <div className="flex items-center justify-center space-x-4">
        <RiMenu2Fill
          className="text-black text-3xl "
          role="button"
          onClick={() => dispatch(setSidebar(true))}
        />
        <img src={logo} alt="" className="w-20 h-full" />
      </div>
      <div className="flex items-center justify-center space-x-3 text-2xl">
        <Link to={"/notification"}>
          <VscBell />
        </Link>
        {/* <Link to={"/cart"}>
          <SlHandbag />
        </Link> */}
        <Link to={"/contact"}>
          <IoCallOutline />
        </Link>
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Shop</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem
                role="button"
                onClick={() => dispatch(setIsLoggedIn(false))}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
