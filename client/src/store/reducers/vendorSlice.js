import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vendor: {
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
        setVendor: (state, action) => {
            state.vendor = action.payload;
        },
    },
});

export const { setVendor } = vendorSlice.actions;

export default vendorSlice.reducer;
