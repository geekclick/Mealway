import { setVendor } from "@/store/reducers/vendorSlice";
import axios from "axios";

export const handleShopRegistration = async (e, vendorInfo, dispatch, navigate) => {
    e.preventDefault()
    try {
        const response = await axios.post("/api/register-shop", vendorInfo);
        if (response) {
            dispatch(setVendor({
                name: "",
                shopname: "",
                location: "",
                address: "",
                contact: "",
                ratings: "",
                reviews: "",
                opnCloseHours: "",
                menu: [],
            }))
            navigate("/");
            console.log("Vendor Added!")
        }
    } catch (error) {
        console.log("Error in Shop Registration", error);
    }
}