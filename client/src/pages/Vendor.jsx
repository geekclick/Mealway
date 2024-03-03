import banner from "@/assets/vendorBanner.png";
import logo from "@/assets/vendorLogo.png";
import { FaChevronLeft, FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProdSlide1 from "@/components/homepage/ProdSlide1";
import Recommended from "@/components/homepage/Recommended";
import BottomNav from "@/components/BottomNav";
import { SlHandbag } from "react-icons/sl";

function Vendor() {
  return (
    <section>
      <div className="relative">
        <img src={banner} alt="" />
        <Link to="/" className="flex justify-center items-center">
          <FaChevronLeft className="absolute left-10 top-20 text-black bg-white rounded-full w-6 h-6 p-1 scale-150 text-muted-foreground" />
        </Link>
      </div>
      <img src={logo} alt="" className="relative -top-10 left-8" />
      <div className="flex flex-col w-full px-6 m-auto -mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">Grandma's shop</h1>
          <GoHeart className="text-2xl text-muted-freground" />
        </div>
        <div className="flex justify-between items-center">
          <div className=" space-y-1 my-1">
            <h4>NYC, Broadway ave 79</h4>
            <h5 className="text-green-700">Opening</h5>
          </div>
          <BsExclamationCircle className="text-xl text-muted-freground" />
        </div>
        <div className="flex justify-between items-center">
          <p className="italic flex mt-1 text-muted-foreground">
            <FaStar className="text-yellow-500 mx-1 mb-4" /> 4.8 (1.2k)
            <SlHandbag className="mx-1.5" /> 99+ orders
          </p>
          <p className="font-medium underline">Reviews</p>
        </div>
      </div>
      <div className="p-6 space-y-8 pb-20">
        <ProdSlide1 title="For You" />
        <Recommended />
      </div>
      <BottomNav />
    </section>
  );
}

export default Vendor;
