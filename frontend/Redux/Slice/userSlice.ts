import { createSlice } from "@reduxjs/toolkit";
import {    
    SendOtp,
    SignUp,
    LogIn,
    GetUser,
    ChangeName
} from "../asyncThunk";

const initialState = {
    _id:"",
    name:"",
    email:"",
    admin:false, 
    profile:{secure_url:""},
    shippingDetails:[{
        name: "",
        houseNo: "",
        address: "",
        pinCode: 0,
        city: "",
        state: "",
        phoneNo: 0,
    }],
    cart:[{
        productId:"",
        qty:"",
    }],
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
        builder.addCase(GetUser.fulfilled,(state,action) => {
            return state = action.payload.data
        })
    },
})

export default userSlice;