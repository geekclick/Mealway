import { Input } from "@/components/ui/input";
import { FaChevronLeft } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

function SearchPage() {
  return (
    <section>
      <div className="flex justify-center items-center space-x-4 shadow-md py-5 px-4">
        <Link to="/" className="flex justify-center items-center">
          <FaChevronLeft className="scale-150 text-muted-foreground" />
        </Link>
        <div
          to={"/search"}
          className=" px-3 border-input w-4/5 bg-[#ECF1F6] border rounded-full flex items-center justify-center"
        >
          <LuSearch className="text-xl text-muted-foreground" />
          <Input
            placeholder="What are you searching for?"
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#ECF1F6] w-full h-10"
          />
        </div>
      </div>
      <div className="px-6 py-8">
        <h2>Recent Search</h2>
        <div className="p-2 flex flex-grow flex-wrap gap-3 w-full">
          <Badge className="text-[12px] px-4 py-1.5 bg-[#ECF1F6] text-[#66707A] font-normal">
            Pizza
          </Badge>
          <Badge className="text-[12px] px-4 py-1.5 bg-[#ECF1F6] text-[#66707A] font-normal">
            Hamburger
          </Badge>
          <Badge className="text-[12px] px-4 py-1.5 bg-[#ECF1F6] text-[#66707A] font-normal">
            Meat bread
          </Badge>
          <Badge className="text-[12px] px-4 py-1.5 bg-[#ECF1F6] text-[#66707A] font-normal">
            Sushi
          </Badge>
          <Badge className="text-[12px] px-4 py-1.5 bg-[#ECF1F6] text-[#66707A] font-normal">
            Donuts
          </Badge>
          <Badge className="text-[12px] px-4 py-1.5 bg-[#ECF1F6] text-[#66707A] font-normal">
            Ramen
          </Badge>
        </div>
      </div>
      <div className="px-6">
        <h2>Popular</h2>
        <div className="p-2 flex flex-grow flex-wrap gap-3 w-full">
          <Badge className="text-[12px] px-4 py-1.5 bg-[#ECF1F6] text-[#66707A] font-normal">
            Pizza
          </Badge>
          <Badge className="text-[12px] px-4 py-1.5 bg-[#ECF1F6] text-[#66707A] font-normal">
            Hamburger
          </Badge>
          <Badge className="text-[12px] px-4 py-1.5 bg-[#ECF1F6] text-[#66707A] font-normal">
            Meat bread
          </Badge>
        </div>
      </div>
    </section>
  );
}

export default SearchPage;
