import { setMenuList } from "@/store/reducers/menuSlice";
import axios from "axios";
import { toast } from "react-toastify";

export const handleAddFood = async (menu, shop_id) => {
    try {
        const response = await axios.post("/api/addFood", { menuList: menu, shop_id: shop_id });
        if (response.data) {
            console.log(response.data)
            localStorage.removeItem("menu")
            toast.apply("Menu Added")
        }
    } catch (error) {
        dispatch(setMenuList([]))
        console.log("Error in Add Food", error);
    }
}

export const getFoods = async (shop_id, dispatch) => {
    try {
        console.log(shop_id)
        if (shop_id) {
            const response = await axios.get("/api/getAllFoods", shop_id);
            if (response.data) {
                console.log(response.data)
                dispatch(setMenuList(response.data))
            }
        }
    } catch (error) {
        dispatch(setMenuList([]))
        console.log("Error in Add Food", error);
    }
}

