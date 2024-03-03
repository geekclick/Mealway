import { LuSearch } from "react-icons/lu";
import { Input } from "../ui/input";

function SearchBar() {
  return (
    <div className=" px-4 border-input border rounded-md flex items-center justify-center">
      <LuSearch className="text-2xl text-muted-foreground" />
      <Input
        placeholder="What are you searching for?"
        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}

export default SearchBar;
