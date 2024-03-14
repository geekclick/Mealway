import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuFavList: [],
    vendorFavList: [],
    // fav: {}
};

const favoriteSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenuFavList: (state, action) => {
            state.menuFavList = action.payload;
        },
        addMenuFav: (state, action) => {
            state.menuFavList.push(action.payload)
        },
        setVendorFavList: (state, action) => {
            state.vendorFavList = action.payload;
        },
        addVendorFav: (state, action) => {
            state.vendorFavList.push(action.payload)
        },
    },
});

export const { setMenuFavList, addMenuFav, setVendorFavList, addVendorFav } = favoriteSlice.actions;

export default favoriteSlice.reducer;
