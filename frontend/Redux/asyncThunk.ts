import {createAsyncThunk} from '@reduxjs/toolkit'
import {API_SEND_OTP,API_SING_UP} from '../api/userApi'


export const SendOtp = createAsyncThunk('user/sendOtp', API_SEND_OTP);
export const SignUp = createAsyncThunk('user/signup', API_SING_UP);
