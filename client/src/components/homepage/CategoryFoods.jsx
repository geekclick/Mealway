import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoodByCategory } from "@/services/food-services"
import { useDispatch, useSelector } from "react-redux";

const CategoryFoods = () => {
    const { category } = useParams(); 

    const menuList = useSelector((state) => state.menuSlice?.menuList || []);
    const dispatch = useDispatch();

    const handleGetFoodByCategory = useCallback(async () => {
        try {
            await getFoodByCategory(category, dispatch)
        } catch (error) {
            console.log(error);
        }
    }, [category, dispatch]);

    useEffect(() => {
        handleGetFoodByCategory();
    }, [handleGetFoodByCategory]); 

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-6">
                {category.toUpperCase()} Foods
            </h1>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                {menuList.map((food) => (
                    <div key={food._id} className="shadow-lg rounded-lg overflow-hidden">
                        <img
                            src={food.image} 
                            alt={food.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="bg-gray-100 p-4">
                            <h2 className="text-lg font-semibold">{food.name}</h2>
                            <p className="text-gray-500">{food.description}</p> 
                            <p className="font-bold mt-2">${food.price}</p> 
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryFoods;
