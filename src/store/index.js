import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthReducer";
import ExpenseReducer from "./ExpenseReducer";
const store = configureStore({
    reducer: { authentication: authReducer, expense:ExpenseReducer  }
})
export default store;