import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    activatePremium : false,
    list: []
};
const ExpenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    fetchExpense: (state,action) =>{state.list = action.payload},
    newExpense: (state,action) =>{state.list = [...state.list, action.payload]},
    activatePremium:(state)=>{state.activatePremium=!state.activatePremium}
  }
});
export const ExpenseSliceActions = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
