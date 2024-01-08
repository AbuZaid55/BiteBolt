import {createAsyncThunk} from '@reduxjs/toolkit'
import {
    API_GET_USER,
    API_LOGIN,
    API_SEND_OTP,
    API_SING_UP,
    API_CHANGE_NAME,
    API_ADD_ADDRESS,
} from '../api/userApi'


export const SendOtp = createAsyncThunk('user/sendOtp', API_SEND_OTP);
export const SignUp = createAsyncThunk('user/signup', API_SING_UP);
export const LogIn = createAsyncThunk('user/login', API_LOGIN);
export const GetUser = createAsyncThunk('user/getuser', API_GET_USER);
export const ChangeName = createAsyncThunk('user/changename', API_CHANGE_NAME);
export const AddAddress = createAsyncThunk('user/addaddress', API_ADD_ADDRESS);
