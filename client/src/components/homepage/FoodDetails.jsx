import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFoodByFoodId } from "@/services/food-services";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function FoodDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const foodDetails = useSelector((state) => state.menuSlice?.menuList || {});
  const shopDetails = useSelector((state) => state.menuSlice?.shopDetails || {});
  const shopFoods = useSelector((state) => state.menuSlice?.shopFoods || []);

  const handleGetFoodByFoodId = useCallback(async () => {
    try {
      await getFoodByFoodId(id, dispatch);
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  }, [id, dispatch]);

  useEffect(() => {
    handleGetFoodByFoodId();
  }, [handleGetFoodByFoodId]);

  if (!foodDetails) {
    return <p className="text-center">Food not found</p>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="p-4">

      
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {/* Food Details Section */}
        <div>
          <h1 className="text-2xl font-bold mb-4 sm: text-center">Food Details</h1>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
            {/* Food Image */}
            <div className="flex justify-center">
              <img
                src={foodDetails.image}
                alt={foodDetails.name}
                className="rounded-lg mb-4 w-full max-w-sm h-auto"
              />
            </div>
            {/* Food Text Details */}
            <div>
              <p className="text-gray-700 italic text-lg mb-2">
                <b>Name:</b> {foodDetails.name || "No description available"}
              </p>
              <p className="text-gray-700 italic text-lg mb-2">
                <b>Description:</b> {foodDetails.description || "No description available"}
              </p>
              <p className="text-xl">
                <b>Price:</b> <span className="font-medium">{foodDetails.price || "Not available"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Shop Details Section */}
        <div>
          <h1 className="text-2xl font-bold mb-4 sm: text-center">Shop Details</h1>
          <div className="flex justify-center">
            <img
              src={shopDetails.shop_cover}
              alt={shopDetails.shop_cover}
              className="rounded-lg mb-4 m-1"
              // w-full max-w-lg h-auto
            />
          </div>
          <p className="text-lg md: text-sm mb-2"><b>Name:</b> {shopDetails.name}</p>
          <p className="text-lg md: text-sm mb-2"><b>Address:</b> {shopDetails.address}</p>
          <p className="text-lg md: text-sm "><b>Contact:</b> {shopDetails.contact}</p>
        </div>
      </div>



      <div>
        <h2 className="text-xl font-bold mt-5 sm: text-center">Other Foods from this Shop</h2>
        <motion.p
          className="text-center text-gray-600 mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
        </motion.p>

        <Slider {...sliderSettings}>
          {shopFoods.map((food) => (
            <motion.div
              key={food._id}
              className="p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white shadow-md rounded-lg p-6 transition duration-300 hover:shadow-green-500/50 hover:shadow-lg">
                <img
                  src={food.image}
                  alt={food.name}
                  className="rounded-lg w-full h-[150px] object-cover mb-4"
                />
                <h3 className="font-semibold text-lg text-gray-800">{food.name}</h3>
                <p className="text-gray-600 mt-2">Price: {food.price}</p>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default FoodDetails;
