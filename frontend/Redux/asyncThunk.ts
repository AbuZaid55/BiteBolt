import {createAsyncThunk} from '@reduxjs/toolkit'
import {API_SEND_OTP} from '../api/userApi'


export const SendOtp = createAsyncThunk('user/sendOtp', API_SEND_OTP);


// builder.addCase(SendOtp.rejected, (state, action) => {
        //     // console.error("SendOtp rejected:", action.error.message);
        // }); 