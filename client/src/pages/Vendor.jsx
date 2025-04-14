import { FaChevronLeft, FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { BsExclamationCircle, BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProdSlide1 from "@/components/homepage/ProdSlide1";
import Recommended from "@/components/homepage/Recommended";
import BottomNav from "@/components/BottomNav";
import { SlHandbag } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { getFoods } from "@/services/food-services";
import { handleAddShopToFavourites } from "@/services/favourite-services";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import MenuDialog from "@/components/MenuDialog";

function Vendor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { vendorList } = useSelector((state) => state.vendorSlice);
  const { menuList } = useSelector((state) => state.menuSlice);
  const thisVendor = useMemo(
    () => vendorList.filter((item) => item._id == id)[0],
    [vendorList]
  );

  const shop_menuList =
    useMemo(() => menuList.filter((item) => item.shop_id == thisVendor._id)) ||
    null;

  const handleGetFood = async () => {
    try {
      await getFoods(thisVendor._id, dispatch);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavourite = async () => {
    try {
      await handleAddShopToFavourites(
        thisVendor._id,
        thisVendor.user_id,
        dispatch
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetFood();
  }, [thisVendor]);
  return (
    <section>
      <div className="relative">
        <img
          src={thisVendor?.shop_cover}
          alt=""
          className="w-[375px] h-[180px]"
        />
        <Link to="/" className="flex justify-center items-center">
          <FaChevronLeft className="absolute left-10 top-20 text-black bg-white rounded-full w-6 h-6 p-1 scale-150 text-muted-foreground" />
        </Link>
      </div>
      <img
        src={thisVendor?.shop_pic}
        alt=""
        className="relative -top-10 left-8 w-[80px] h-[80px]"
      />
      <div className="flex flex-col w-full px-6 m-auto -mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">{thisVendor?.name}</h1>
          <GoHeart
            onClick={handleFavourite}
            className="text-2xl text-muted-freground"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className=" space-y-1 my-1">
            <h4>{thisVendor?.address}</h4>
            <h5 className="text-green-700">Opening</h5>
          </div>
          <Link to={`/vendor-info/${thisVendor?._id}`}>
            <BsExclamationCircle className="text-xl text-muted-freground" />
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <p className="italic flex mt-1 text-muted-foreground">
            <FaStar className="text-yellow-500 mx-1 mb-4" /> 4.8 (1.2k)
            <SlHandbag className="mx-1.5" /> 99+ orders
          </p>
          <p className="font-medium underline">Reviews</p>
        </div>
      </div>
      <div className="p-3">
        <MenuDialog>
          <Button className="w-full">Add New Menu</Button>
        </MenuDialog>
      </div>
      <div className="p-6 space-y-8 pb-20">
        {shop_menuList.length != 0 && (
          <>
            <ProdSlide1 title={"For You"} list={shop_menuList} />
            <Recommended list={shop_menuList} />
          </>
        )}
      </div>
      <BottomNav />
    </section>
  );
}

export default Vendor;
