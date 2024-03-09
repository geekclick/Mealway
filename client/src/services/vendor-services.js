import { setMenuList } from "@/store/reducers/menuSlice";
import { setVendor, setVendorList } from "@/store/reducers/vendorSlice";
import axios from "axios";

export const handleShopRegistration = async (vendorInfo, dispatch, navigate) => {
    try {
        const response = await axios.post("/api/register-shop", vendorInfo);
        if (response) {
            dispatch(setVendor({
                img: "",
                coverImg: "",
                name: "",
                shopname: "",
                location: "",
                address: "",
                contact: "",
                openingHour: "",
                closingHour: "",
                menu: [],
            }))
            dispatch(setMenuList([]))
            navigate("/");
            console.log("Vendor Added!")
        }
    } catch (error) {
        dispatch(setMenuList([]))
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

export const sendImagetoCloud = async (image, folderName) => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "mealway")
    data.append("cloud_name", "dxn3cmvet")
    data.append("folder", folderName);

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