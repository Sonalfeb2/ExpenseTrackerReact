import { createSlice } from '@reduxjs/toolkit';
const initialState = {
     isLogin: false,
     userId : undefined
}
const AuthSlices = createSlice({
    name : 'authentication',
    initialState,
    reducers: {
    login : (state,action)=>{state.isLogin=true; state.userId=action.payload},
    logout:(state)=>{state.isLogin=false; state.userId=undefined},
    }
})
export const AuthActions = AuthSlices.actions;
export default AuthSlices.reducer;