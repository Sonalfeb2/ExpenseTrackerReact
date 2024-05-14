import { createSlice } from '@reduxjs/toolkit';
const id = localStorage.getItem('userId');
const initialState = {
     isLogin: id?true:false,
     userId : id?id:null
}
const AuthSlices = createSlice({
    name : 'authentication',
    initialState,
    reducers: {
    login : (state,action)=>{state.isLogin=true; state.userId=action.payload},
    logout:(state)=>{state.isLogin=false; state.userId=undefined; localStorage.clear()},
    }
})
export const AuthActions = AuthSlices.actions;
export default AuthSlices.reducer;