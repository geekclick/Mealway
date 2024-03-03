import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sidebarReducer from "./reducers/sidebarSlice";

const persistConfig = {
    key: "root",
    storage,
    // whitelist: ["auth"], // List of reducers to persist (optional)
    blacklist: ["sidebarSlice"],
};

const rootReducer = combineReducers({
    sidebarSlice: sidebarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);
export { store, persistor };
