import Navbar from "@/components/Navbar";
import NavGrid from "@/components/homepage/NavGrid";
import Offers from "@/components/homepage/Offers";
import ProdSlide1 from "@/components/homepage/ProdSlide1";
import SearchBar from "@/components/homepage/SearchBar";
import ShopSlide1 from "@/components/homepage/ShopSlide1";
import BottomNav from "@/components/BottomNav";
import Recommended from "@/components/homepage/Recommended";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/homepage/Hero";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { getFoods } from "@/services/food-services";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const { menuList } = useSelector((state) => state.menuSlice);
  useEffect(() => {
    getFoods("", dispatch);
  }, []);
  return (
    <div className="">
      <Navbar />
      <Sidebar />
      <Hero />
      <div className="pt-16 pb-20 space-y-16 px-4 lg:px-20 bg-[#FAF6F6]">
        <SearchBar />
        {/* <Offers /> */}
        <NavGrid />
        <ProdSlide1 title={"What's delicious around here?"} list={menuList} />
        {/* <img src={""} alt="promo" /> */}
        <ShopSlide1 title={"Nearby Restaurants"} />
        {/* <ProdSlide1 title={"Highlights of March"} /> */}
        {/* <Recommended /> */}
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default Home;
