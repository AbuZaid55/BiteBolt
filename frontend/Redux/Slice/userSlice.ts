import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {API_SEND_OTP} from '../../api/userApi'

const userSlice = createSlice({
    name:"user",
    initialState:{},
    reducers:{
        SendOtp(state,action:PayloadAction<string>){
            const res = API_SEND_OTP()
        }
    }
})

export default userSlice;
export const {SendOtp} = userSlice.actions