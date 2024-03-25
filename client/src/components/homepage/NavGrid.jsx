import FlashDeals from "@/assets/homepage/NavGrid/1.png";
import NiceShop from "@/assets/homepage/NavGrid/2.png";
import Points from "@/assets/homepage/NavGrid/3.png";
import Rice from "@/assets/homepage/NavGrid/4.png";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const links = [
  {
    name: "Non-Vegetarian",
    img: FlashDeals,
  },
  {
    name: "Vegetarian",
    img: NiceShop,
  },
  {
    name: "Sweet & Namkeen",
    img: Points,
  },
  {
    name: "Chaat",
    img: Rice,
  },
];

function NavGrid() {
  return (
    <section className="py-10 space-y-10">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl md:text-2xl italic">
          What are you looking for ?
        </h1>
        <Link to={"/"}>
          <AiOutlineRight />
        </Link>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 xl:px-16 gap-4 place-items-center">
        {links.map((link, i) => {
          return (
            <Link
              to={"/"}
              className="flex flex-col items-center justify-center space-y-3 rounded-xl hover:shadow-xl hover:border border-primary transition-all bg-white aspect-square w-[150px] h-[150px] lg:w-[200px] lg:h-[200px]"
              key={i}
            >
              <img src={link.img} alt="" className="lg:w-[70px] w-[40px]" />
              <p className="lg:text-lg">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default NavGrid;
