import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    sidebarOpen: false,
};

const sidebarSlice = createSlice({
    name: "sidebarState",
    initialState,
    reducers: {
        setSidebar: (state, action) => {
            state.sidebarOpen = action.payload;
        },
    },
});

export const { setSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
