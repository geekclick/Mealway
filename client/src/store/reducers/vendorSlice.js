import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuList: [],
    vendorList: [],
    vendor: {
        img: "",
        coverImg: "",
        name: "",
        shopname: "",
        location: "",
        address: "",
        contact: "",
        ratings: "",
        reviews: "",
        openCloseHours: { open: "", close: "" },
        menu: [],
    },
};

const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {
        setVendorList: (state, action) => {
            state.vendorList = action.payload;
        },
        setVendor: (state, action) => {
            state.vendor = action.payload;
        },
        addMenu: (state, action) => {
            state.menuList.push(action.payload)
        }
    },
});

export const { setVendorList, setVendor, addMenu } = vendorSlice.actions;

export default vendorSlice.reducer;
