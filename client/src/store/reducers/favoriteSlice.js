import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuFavList: [],
    shopFavList: [],
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
        setShopFavList: (state, action) => {
            state.shopFavList = action.payload;
        },
        addShopFav: (state, action) => {
            state.shopFavList.push(action.payload)
        },
        removeShopFav: (state, action) => {
            state.shopFavList = state.shopFavList.filter(
                (shop) => shop.shop_id !== action.payload
            );
        },        
    },
});

export const { setMenuFavList, addMenuFav, setShopFavList, addShopFav, removeShopFav } = favoriteSlice.actions;

export default favoriteSlice.reducer;
