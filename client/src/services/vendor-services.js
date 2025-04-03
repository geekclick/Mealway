import { setVendor, setVendorList } from "@/store/reducers/vendorSlice";
import axios from "axios";

export const handleShopRegistration = async (shopInfo, user) => {
    try {
        console.log(shopInfo);
        
        const response = await axios.post("/api/register-shop", { shopInfo: shopInfo, user_email: user });
        console.log("Response : ",response);
        
        if (response) {
            console.log("Vendor Added!")
            localStorage.removeItem("menu")
        }
    } catch (error) {
        console.log("Error in Shop Registration", error.response ? error.response.data : error.message);
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

export const sendImagetoCloud = async (image, folderName) => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "mealway")
    data.append("cloud_name", "dxn3cmvet")
    data.append("folder", `mealway/${folderName}`);

    try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dxn3cmvet/image/upload", data)
        if (response) {
            console.log("Image uploaded successfully!")
            return response.data.secure_url
        }
    } catch (error) {
        console.log("Error in image upload", error)
    }
}