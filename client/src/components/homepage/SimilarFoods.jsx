import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFoodByFoodName } from "@/services/food-services";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function similarFoods() {
  const { foodName } = useParams();
  const dispatch = useDispatch();
  const similarFoods = useSelector((state) => state.menuSlice?.menuList || {});

  const handleGetFoodByFoodName = useCallback(async () => {
    try {
      await getFoodByFoodName(foodName, dispatch);
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  }, [foodName, dispatch]);

  useEffect(() => {
    handleGetFoodByFoodName();
  }, [handleGetFoodByFoodName]);

  if (!similarFoods) {
    return <p className="text-center">Food not found</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Similar Foods</h1>
  
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {similarFoods.map((food, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
              {/* Food Image */}
              <div className="flex justify-center">
                <img
                  src={food.image}
                  alt={food.name}
                  className="rounded-lg mb-4 w-full max-w-sm h-auto"
                />
              </div>
              {/* Food Text Details */}
              <div>
                <p className="text-gray-700 italic text-lg mb-2">
                  <b>Name:</b> {food.name || "No name available"}
                </p>
                <p className="text-gray-700 italic text-lg mb-2">
                  <b>Description:</b> {food.description || "No description available"}
                </p>
                <p className="text-xl">
                  <b>Price:</b> <span className="font-medium">{food.price || "Not available"}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  

}
export default similarFoods;
