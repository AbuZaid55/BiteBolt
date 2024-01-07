import { createSlice } from "@reduxjs/toolkit";
import {    
    SendOtp,
    SignUp,
    LogIn,
    GetUser
} from "../asyncThunk";


const userSlice = createSlice({
    name:"user",
    initialState:{},
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(SendOtp.fulfilled, (state, action) => {});
        builder.addCase(SignUp.fulfilled,(state,action) => {})
        builder.addCase(LogIn.fulfilled,(state,action) => {})
        builder.addCase(GetUser.fulfilled,(state,action) => {
            state = action.payload.data
        })
    },
})

export default userSlice;