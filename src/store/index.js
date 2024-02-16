import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthReducer";
const store = configureStore({
    reducer: { authentication: authReducer }
})
export default store;