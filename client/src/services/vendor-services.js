import { setVendor, setVendorList } from "@/store/reducers/vendorSlice";
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

export const getVendorList = async (dispatch, navigate) => {
    try {
        const response = await axios.get("api/getAllVendors")
        if (response) {
            dispatch(setVendorList(response.data))
            navigate("/")
        }
    } catch (error) {
        console.log("Error in vendor list", error)
    }
}