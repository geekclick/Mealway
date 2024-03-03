import { setSidebar } from "@/store/reducers/sidebarSlice";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import profileImg from "@/assets/profileLogo.png";
import { IoWalletOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CiDiscount1 } from "react-icons/ci";
import { Link } from "react-router-dom";

function Sidebar() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.sidebarSlice.sidebarOpen);
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        dispatch(setSidebar(false));
      }
    }
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <motion.section
      ref={sidebarRef}
      initial={{ x: -302 }} // Initial position outside of the viewport
      animate={{ x: sidebarOpen ? 0 : -302 }} // Slide in/out animation
      transition={{ duration: 0.3 }} // Animation duration
      className="fixed z-20 min-h-screen w-[300px] p-[24px] bg-white flex flex-col space-y-10"
    >
      <div className=" space-y-8">
        <div className="flex space-x-2">
          <img src={profileImg} alt="" className="w-[48px] h-[48px]" />
          <div className="flex flex-col -space-y-1">
            <h2 className="font-medium italic">Anuj Ghom</h2>
            <small>habhainakliemailhai@gmail.com</small>
          </div>
        </div>
        <div>
          <ul className="flex flex-col space-y-4">
            <li className=" font-medium flex italic">
              <IoWalletOutline className="text-primary text-2xl mx-2" /> Wallet
            </li>
            <li className=" font-medium flex italic">
              <HiOutlineLocationMarker className="text-primary text-2xl mx-2" />{" "}
              My Address
            </li>
            <li className=" font-medium flex italic">
              <CiDiscount1 className="text-primary text-2xl mx-2" /> Special
              offer/ Promotion
            </li>
          </ul>
        </div>
        <div className="bg-[#BFC6CC] w-full h-px"></div>
        <div className="flex flex-col space-y-5 px-3">
          <Link>Language</Link>
          <Link>Order history</Link>
          <Link>Notification</Link>
          <Link>Share infomation</Link>
          <Link>Terms and policies</Link>
        </div>
      </div>
    </motion.section>
  );
}

export default Sidebar;
