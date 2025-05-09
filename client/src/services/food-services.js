import { setMenuList, setShopDetails, setShopFoods } from "@/store/reducers/menuSlice";
import axios from "axios";
import { toast } from "react-toastify";

export const handleAddFood = async (menu, shop_id) => {
    try {
        const response = await axios.post("/api/addFood", { menu: menu, shop_id: shop_id });
        if (response.data) {
            toast.apply("Menu Added")
        }
    } catch (error) {
        console.log("Error in Add Food", error);
    }
}

export const getFoods = async (shop_id, dispatch) => {
    try {
        const response = await axios.get("/api/getAllFoods", shop_id);
        if (response.data) {
            dispatch(setMenuList(response.data))
        }
    } catch (error) {
        dispatch(setMenuList([]))
        console.log("Error in Get Food", error);
    }
}

export const getFoodByCategory = async (category, dispatch) => {
    try {
        const response = await axios.get(`/api/getFoodByCategory/${category}`)

        if (response.data) {
            dispatch(setMenuList(response.data));
        }
    } catch (error) {
        dispatch(setMenuList([]));
        console.error("Error in fetching foods by category:", error);
    }
}

export const getFoodByFoodId = async (Id, dispatch) => {
    try {
        const response = await axios.get(`/api/getFoodByFoodId/${Id}`);
        if (response.data) {
            dispatch(setMenuList(response.data.food))
            dispatch(setShopDetails(response.data.shop))
            dispatch(setShopFoods(response.data.shopFoods))
        }
    } catch (error) {
        dispatch(setMenuList([]));
        console.error("Error in fetching foods by id:", error);
    }
}

export const getFoodByFoodName = async (foodName, dispatch) => {
    try {
        const response = await axios.get(`/api/getFoodByFoodName/${foodName}`)

        if (response.data) {
            dispatch(setMenuList(response.data))
        }

    } catch (error) {
        dispatch(setMenuList([]));
        console.error("Error in fetching food from food name", error);
    }
}