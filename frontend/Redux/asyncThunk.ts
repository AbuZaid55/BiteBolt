import {createAsyncThunk} from '@reduxjs/toolkit'
import {
    API_GET_USER,
    API_LOGIN,
    API_SEND_OTP,
    API_SING_UP,
    API_CHANGE_NAME,
    API_ADD_ADDRESS,
    API_UPLOAD_FILE,
    API_SEND_LINK,
    API_CHANGE_PASS,
    API_LOGOUT,
} from '../api/userApi'

import { 
    API_ADD_CATEGORY, 
    API_ADD_SUBCATEGORY,
    API_GET_CATEGORIES,
} from '../api/categoryApi';

import { 
    API_ADD_PRODUCT 
} from '../api/poductApi';

//user
export const SendOtp = createAsyncThunk('user/sendOtp', API_SEND_OTP);
export const SignUp = createAsyncThunk('user/signup', API_SING_UP);
export const LogIn = createAsyncThunk('user/login', API_LOGIN);
export const GetUser = createAsyncThunk('user/getuser', API_GET_USER);
export const ChangeName = createAsyncThunk('user/changename', API_CHANGE_NAME);
export const AddAddress = createAsyncThunk('user/addaddress', API_ADD_ADDRESS);
export const UploadFile = createAsyncThunk('user/uploadfile', API_UPLOAD_FILE);
export const SendLink = createAsyncThunk('user/sendlink', API_SEND_LINK);
export const ChangePass = createAsyncThunk('user/updatepass', API_CHANGE_PASS);
export const LogOut = createAsyncThunk('user/updatepass', API_LOGOUT);


//category
export const AddNewCategory = createAsyncThunk('category/addcategory', API_ADD_CATEGORY);
export const AddSubCategory = createAsyncThunk('category/addsubcategory', API_ADD_SUBCATEGORY);
export const GetCategories = createAsyncThunk('category/getcategories', API_GET_CATEGORIES);


//product
export const AddProduct = createAsyncThunk('product/addproduct',API_ADD_PRODUCT)