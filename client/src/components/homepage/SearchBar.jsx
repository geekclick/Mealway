import { LuSearch } from "react-icons/lu";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";

function SearchBar() {
  return (
    <Link
      to={"/search"}
      className=" px-4 border-input border rounded-full flex items-center justify-center bg-[#E2E2E2] "
    >
      <LuSearch className="text-2xl" />
      <p className=" text-black flex h-12 w-full px-3 py-4 text-sm">
        What are you searching for?
      </p>
    </Link>
  );
}

export default SearchBar;
