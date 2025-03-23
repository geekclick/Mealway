import { addShopFav, setShopFavList, removeShopFav } from "@/store/reducers/favoriteSlice";
import axios from "axios";
import { toast } from "react-toastify";

// Add Shop to Favourites
export const handleAddShopToFavourites = async (shopId, userId, dispatch) => {
    try {
        const response = await axios.post("/api/addShopToFavourite", { user_id: userId, shop_id: shopId });

        if (response) {
            toast.success("Shop added to favourites!");
        }
    } catch (error) {
        if (error.response?.status === 400) {
            toast.error(error.response.data.message || "Failed to add <s></s>hop to favourites");
        }
    }
};

// Add Food to Favourites
export const handleAddFoodToFavourites = async (foodId, userId, dispatch, setError) => {
    try {
        const response = await axios.post("/api/addFoodToFavourite", { user_id: userId, food_id: foodId });

        if (response) {
            toast.success("Food added to favourites!");
            console.log("Food added to favourites", response.data);
        }
    } catch (error) {
        if (error.response?.status === 400) {
            toast.error(error.response.data.message || "Failed to add food to favourites");
        }
        setError('root', { message: error.response?.data?.message || "Something went wrong" });
    }
};

export const handleGetFavourites = async (userId, dispatch) => {
    try {
        const response = await axios.get("/api/getFavourite", {
            params: {
                user_id: userId,
            }
        });

        if (response) {
            console.log(response.data);
            dispatch(setShopFavList(response.data))
        }
    } catch (error) {
        if (error.response?.status === 400) {
            toast.error(error.response.data.message || "Failed to get from favourites");
        }
    }
}

export const handleRemoveShopFromFavourite = async (shopId, userId, dispatch) => {
    try {
        const response = await axios.delete("/api/removeShopFromFavourite", {
            data: { user_id: userId, shop_id: shopId },
        });


        if (response) {
            toast.success("Shop Remove From favourites!");
            dispatch(removeShopFav(shopId));
        }

    } catch (error) {
        if (error.response?.status === 400) {
            toast.error(error.response.data.message || "Failed to remove from favourites");
        }
    }
}