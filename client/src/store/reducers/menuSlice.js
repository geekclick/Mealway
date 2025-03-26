import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuList: [],
    shopDetails: {},
    shopFoods: [],
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenuList: (state, action) => {
            state.menuList = action.payload;
        },
        setShopDetails: (state, action) => {
            state.shopDetails = action.payload;
        },
        setShopFoods: (state, action) => {
            state.shopFoods = action.payload;
        },
        addMenu: (state, action) => {
            state.menuList.push(action.payload);
        },
    },
});

export const { setMenuList, setShopDetails, setShopFoods, addMenu } = menuSlice.actions;

export default menuSlice.reducer;