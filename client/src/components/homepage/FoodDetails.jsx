import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFoodByFoodId } from "@/services/food-services";

function FoodDetails() {
  const { id } = useParams(); 
  const dispatch = useDispatch(); 
  const menuList = useSelector((state) => state.menuSlice?.menuList || []);  

  const handleGetFoodByFoodId = useCallback(async () => {
    try {
      await getFoodByFoodId(id, dispatch); 
    } catch (error) {
      console.error("Error fetching food details:", error);
    }}, [id, dispatch]);

  useEffect(() => {
    handleGetFoodByFoodId();
  }, [handleGetFoodByFoodId]);

  if (!menuList) {
    return <p className="text-center">menuList not found</p>; 
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{menuList.name}</h1>
      <img
        src={menuList.image} 
        alt={menuList.name}
        className="rounded-lg mx-auto mb-4"
        style={{ maxWidth: "300px", height: "300px" }}
      />
      <p className="text-gray-700 italic">{menuList.description || "No description available"}</p>
      <p className="text-lg mt-4">
        Price: <span className="font-semibold">{menuList.price || "Not available"}</span>
      </p>
    </div>
  );
}

export default FoodDetails;
