import Navbar from "@/components/Navbar";
import NavGrid from "@/components/homepage/NavGrid";
import Offers from "@/components/homepage/Offers";
import ProdSlide1 from "@/components/homepage/ProdSlide1";
import SearchBar from "@/components/homepage/SearchBar";
import Promo from "@/assets/promo.png";
import ShopSlide1 from "@/components/homepage/ShopSlide1";
import BottomNav from "@/components/BottomNav";
import Recommended from "@/components/homepage/Recommended";

function Home() {
  return (
    <div className="">
      <Navbar />
      <div className="py-20 space-y-8 px-6">
        <SearchBar />
        <Offers />
        <NavGrid />
        <ProdSlide1 title={"What's delicious around here?"} />
        <img src={Promo} alt="" />
        <ProdSlide1 title={"Highlights of March"} />
        <ShopSlide1 title={"Nearby Restaurants"} />
        <Recommended />
      </div>
      <BottomNav />
    </div>
  );
}

export default Home;
