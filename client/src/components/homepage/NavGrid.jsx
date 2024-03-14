import FlashDeals from "@/assets/homepage/NavGrid/1.png";
import NiceShop from "@/assets/homepage/NavGrid/2.png";
import Points from "@/assets/homepage/NavGrid/3.png";
import Rice from "@/assets/homepage/NavGrid/4.png";
import Noodles from "@/assets/homepage/NavGrid/5.png";
import Vegetable from "@/assets/homepage/NavGrid/6.png";
import BBQ from "@/assets/homepage/NavGrid/7.png";
import Other from "@/assets/homepage/NavGrid/8.png";
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
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
      {links.map((link, i) => {
        return (
          <Link
            to={"/"}
            className="flex flex-col items-center justify-center space-y-3"
            key={i}
          >
            <img src={link.img} alt="" className="lg:w-[70px] w-[40px]" />
            <p className="lg:text-lg">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default NavGrid;
