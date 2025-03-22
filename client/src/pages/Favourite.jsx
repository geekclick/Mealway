import BottomNav from "@/components/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  handleAddShopToFavourites,
  handleAddFoodToFavourites,
  handleGetFavourites,
  handleRemoveShopFromFavourite,
} from "../services/favourite-services";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Favourite() {
  const [data, setData] = useState({ food: [], shop: [] });
  const { user } = useSelector((state) => state.authSlice);
  const { shopFavList } = useSelector((state) => state.favoriteSlice);
  const dispatch = useDispatch();

  const handleGetFavourite = useCallback(async () => {
    try {
      await handleGetFavourites(user.id, dispatch);
    } catch (error) {
      console.log(error);
    }
  }, [shopFavList]);

  const handleFavourite = async (itemId, type) => {
    if (!user.id) return;

    await handleAddShopToFavourites(itemId, user.id, dispatch, (name, error) =>
      console.error(error)
    );
  };

  const handleRemoveFavourite = async (itemId) => {
    if (!user.id) return;

    try {
      await handleRemoveShopFromFavourite(
        itemId,
        user.id,
        dispatch,
        (name, error) => console.error(error)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetFavourite();
  }, [shopFavList]);

  return (
    <section>
      <div className="flex justify-center items-center py-6">
        <h1 className="text-center">Favourite List</h1>
      </div>
      <div className="w-full flex justify-center items-center pb-16">
        <Tabs defaultValue="vendors">
          <TabsList>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="dishes">Dishes</TabsTrigger>
          </TabsList>
          <TabsContent value="vendors">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              {shopFavList.map(({ shop_id }, i) => {
                return (
                  <div
                    key={shop_id._id}
                    className="flex space-x-4 my-10 mx-2 w-full"
                  >
                    <img
                      src={`${shop_id.shop_pic}`}
                      alt=""
                      className="rounded-xl w-20 aspect-square"
                    />
                    <div className="flex flex-col justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{shop_id.name}</h4>
                        <p>{shop_id.address}</p>
                      </div>
                      <p className="italic w-full flex mt-1">
                        <FaStar className="text-yellow-500 mx-1 mb-4" />{" "}
                        4.8(1.2k) | 1.5 km
                      </p>
                    </div>
                    {/* <button onClick={() => handleFavourite(shop_id._id, "shop")}>
                      <GoHeartFill className="m-2 text-primary text-xl" />
                    </button> */}
                    <button
                      onClick={() => {
                        const isFavourite = shopFavList.some(
                          (fav) => fav.shop_id._id === shop_id._id
                        );
                        if (isFavourite) {
                          handleRemoveFavourite(shop_id._id);
                        } else {
                          handleFavourite(shop_id._id, "shop");
                        }
                      }}
                    >
                      {shopFavList.some(
                        (fav) => fav.shop_id._id === shop_id._id
                      ) ? (
                        <GoHeartFill className="m-2 text-primary text-xl" />
                      ) : (
                        <GoHeart className="m-2 text-primary text-xl" />
                      )}
                    </button>

                    <div className="flex flex-col justify-center items-center">
                      <Link
                        to={`/vendor/${shop_id._id}`}
                        className="flex justify-center items-center"
                      >
                        <FaChevronRight className="text-black" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="dishes">
            <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-10">
              {data?.food?.map((item, i) => {
                return (
                  <div key={item._id}>
                    <img
                      src={`https://source.unsplash.com/155x126/?food$${i}`}
                      alt=""
                      className="rounded-xl rounded-b-none"
                    />
                    <h4 className="font-semibold">{item.name}</h4>
                    <div className="flex justify-between items-start">
                      <p className="italic w-full flex mt-1">
                        <FaStar className="text-yellow-500 mx-1 mb-4" /> 4.8
                        (1.2k)
                      </p>
                      <button onClick={() => handleFavourite(item._id, "food")}>
                        <GoHeartFill className="text-primary text-xl" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <BottomNav />
    </section>
  );
}

export default Favourite;
