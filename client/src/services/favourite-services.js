import { addShopFav, setShopFavList, removeShopFav } from "@/store/reducers/favoriteSlice";
import axios from "axios";
import { toast } from "react-toastify";

// Add Shop to Favourites
export const handleAddShopToFavourites = async (shopId, userId, dispatch) => {
    try {
        const response = await axios.post("/api/addShopToFavourite", { user_id: userId, shop_id: shopId });

        if (response) {
            console.log("\n \n from favourite services : \n \n",response.data)
            toast.success("Shop added to favourites!");
            console.log("Shop added to favourites", response.data);
        }
    } catch (error) {
        if (error.response?.status === 400) {
            toast.error(error.response.data.message || "Failed to add shop to favourites");
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
        console.log(userId)
        const response = await axios.post("/api/getFavourite", {user_id: userId});

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
        
        // console.log("\n User ID From Remove Shop From Favourite : \n",userId);
        // console.log("\n Shop ID From Remove Shop From Favourite : \n",shopId);
        
        const response = await axios.delete("/api/removeShopFromFavourite", {
            data: { user_id: userId, shop_id: shopId },
        });


        if(response){
            console.log("\n Response From favourite services : ",response)
            dispatch(removeShopFav(shopId));
        }
        
    } catch (error) {
        if (error.response?.status === 400) {
            toast.error(error.response.data.message || "Failed to remove from favourites");
        }
    }
}