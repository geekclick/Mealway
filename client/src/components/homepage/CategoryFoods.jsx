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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                {category.toUpperCase()} Foods
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {menuList.map((food) => (
                    <div 
                        key={food._id}
                        className="bg-gray-900 border-2 border-cyan-500 text-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"

                    >
                        {/* Food Image */}
                        <div className="grid grid-cols-2">
                            <div className="p-4">
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-40 object-cover rounded-md"
                                />
                            </div>

                            {/* Food Details */}
                            <div className="p-4 border-t text-black border-gray-700">
                                <h2 className="text-2xl  font-bold text-gray-100">{food.name}</h2>
                                <p className="text-xl text-gray-400 mt-1">{food.description}</p>
                                <p className="mt-3 text-lg font-semibold text-gray-200">
                                    Category: <span className="font-normal">{food.category}</span>
                                </p>
                                <p className="mt-2 text-lg font-bold text-sky-900">
                                    Price: ${food.price}
                                </p>
                            </div>
                        </div>

                        {/* Shop Details */}
                        {food.shop_id && (
                            <div className="text-black">
                                <div className="p-2 pb-1 border-t border-gray-700 text-black">
                                    <img
                                        src={food.shop_id.shop_pic}
                                        alt={food.shop_id.name}
                                        className="w-full h-32 object-cover rounded-md mb-3"
                                    />
                                </div>
                                <div className="grid grid-cols-2 m-5 mt-1">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-100">
                                            {food.shop_id.name}
                                        </h3>
                                        <p className="text-gray-400">{food.shop_id.address}</p>
                                        <p className="text-gray-400">{food.shop_id.contact}</p>
                                    </div>
                                    <div className="pl-5">
                                        <p className="text-gray-300 mt-2 ">
                                            {food.shop_id.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

};

export default CategoryFoods;
