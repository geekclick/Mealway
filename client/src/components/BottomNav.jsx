import { GoHomeFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { MdOutlineReceiptLong } from "react-icons/md";
import { LuCompass } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";

const links = [
  { name: "Home", icon: <GoHomeFill />, link: "" },
  { name: "Map", icon: <LuCompass />, link: "map" },
  { name: "Favourite", icon: <GoHeart />, link: "favourite" },
  { name: "Order", icon: <MdOutlineReceiptLong />, link: "order" },
];

function BottomNav() {
  const currentPath = location.pathname.split("/");
  return (
    <nav className="fixed w-full z-50 bottom-0 bg-white flex lg:hidden justify-evenly items-center py-4 shadow-md shadow-black">
      {links.map((item, i) => {
        return (
          <Link
            to={`/${item.link}`}
            key={i}
            className={`flex flex-col justify-center items-center ${
              currentPath[1] == item.link ? "text-primary" : ""
            }`}
          >
            {item.icon}
            <p>{item.name}</p>
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomNav;
