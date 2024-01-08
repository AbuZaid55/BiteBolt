import { createSlice } from "@reduxjs/toolkit";
import {    
    SendOtp,
    SignUp,
    LogIn,
    GetUser,
    ChangeName,
    AddAddress,
    UploadFile,
    SendLink,
    ChangePass
} from "../asyncThunk";

interface initialState {
    [key:string]:any
}

const initialState:initialState = {
    _id:"1",
    name:"",
    email:"",
    admin:false, 
    profile:{secure_url:""},
    shippingDetails:[],
    cart:[],
    wishlist:[],
    data:""
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(SendOtp.fulfilled, (state, action) => {});
        builder.addCase(SignUp.fulfilled,(state,action) => {})
        builder.addCase(LogIn.fulfilled,(state,action) => {})
        builder.addCase(ChangeName.fulfilled,(state,action) => {})
        builder.addCase(SendLink.fulfilled,(state,action) => {})
        builder.addCase(ChangePass.fulfilled,(state,action) => {console.log(action)})
        builder.addCase(GetUser.fulfilled,(state,action) => {
            return state = action.payload.data
        })
        builder.addCase(GetUser.rejected,(state,action) => {
            state._id = ""
            return state;
        })
        builder.addCase(AddAddress.fulfilled,(state,action) => {
            state.shippingDetails.push(action.payload.data)
            return state;
        })
        builder.addCase(UploadFile.fulfilled,(state,action) => {
            state.profile.secure_url=action.payload.data
            return state;
        })
    },
})

export default userSlice;