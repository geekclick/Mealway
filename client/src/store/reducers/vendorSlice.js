import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
        openingHour: "",
        closingHour: "",
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
    },
});

export const { setVendorList, setVendor } = vendorSlice.actions;

export default vendorSlice.reducer;
