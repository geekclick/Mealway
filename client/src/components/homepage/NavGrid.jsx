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
    name: "Flash deals",
    img: FlashDeals,
  },
  {
    name: "Nice shop",
    img: NiceShop,
  },
  {
    name: "Points",
    img: Points,
  },
  {
    name: "Rice",
    img: Rice,
  },
  {
    name: "Noodles",
    img: Noodles,
  },
  {
    name: "Vegetable",
    img: Vegetable,
  },
  {
    name: "BBQ",
    img: BBQ,
  },
  {
    name: "Other",
    img: Other,
  },
];

function NavGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {links.map((link, i) => {
        return (
          <Link
            to={"/"}
            className="flex flex-col items-center justify-center"
            key={i}
          >
            <img src={link.img} alt="" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default NavGrid;
