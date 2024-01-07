import { createSlice } from "@reduxjs/toolkit";
import { SendOtp ,SignUp} from "../asyncThunk";


const userSlice = createSlice({
    name:"user",
    initialState:{},
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(SendOtp.fulfilled, (state, action) => {});
        builder.addCase(SignUp.fulfilled,(state,action) => {})
    },
})

export default userSlice;