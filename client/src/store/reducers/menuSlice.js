import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuList: [],
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenuList: (state, action) => {
            state.menuList = action.payload;
        },
        addMenu: (state, action) => {
            state.menuList.push(action.payload)
        }
    },
});

export const { setMenuList, addMenu } = menuSlice.actions;

export default menuSlice.reducer;
