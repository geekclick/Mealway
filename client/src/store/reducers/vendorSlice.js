import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vendorList: [{
        img: "",
        coverImg: "",
        name: "anuj",
        shopname: "anuj chi dukan",
        location: "",
        address: "ghara jawal",
        contact: "1234567898",
        ratings: "",
        reviews: "",
        opnCloseHours: "",
        menu: [],
    }],
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
        opnCloseHours: "",
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
