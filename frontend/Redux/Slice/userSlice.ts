import { createSlice } from "@reduxjs/toolkit";
import {    
    GetUser,
    AddAddress,
    UploadFile,
    AddToCart,
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