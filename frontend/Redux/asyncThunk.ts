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
    API_ADDTOCART,
    API_GETCARTITEMS,
    API_UPDATE_QTY,
    API_DELETE_CARTITEM,
    API_ADDTO_WISHLIST,
    API_GET_WISHLIST,
    API_REMOVE_WISHLISTITEM,
    API_REMOVE_ADDRESS,
} from '../api/userApi'

import { 
    API_ADD_CATEGORY, 
    API_ADD_SUBCATEGORY,
    API_GET_CATEGORIES,
} from '../api/categoryApi';

import { 
    API_ADD_PRODUCT,
    API_DELETE_REVIEW, 
    API_GET_FILTERPRODUCT, 
    API_GET_POPULARPRODUCT, 
    API_GET_PRODUCT, 
    API_GET_SINGLEPRODUCT,
    API_SIMILAR_PRODUCT,
    API_SUBMIT_REVIEW 
} from '../api/poductApi';

import { 
    API_CREATE_PAYMENT, API_GET_ORDERS, API_GET_STATUS, API_VERIFY_PAYMENT,
} from '../api/orderApi';

//user
export const SendOtp = createAsyncThunk('user/sendOtp', API_SEND_OTP);
export const SignUp = createAsyncThunk('user/signup', API_SING_UP);
export const LogIn = createAsyncThunk('user/login', API_LOGIN);
export const GetUser = createAsyncThunk('user/getuser', API_GET_USER);
export const ChangeName = createAsyncThunk('user/changename', API_CHANGE_NAME);
export const AddAddress = createAsyncThunk('user/addaddress', API_ADD_ADDRESS);
export const RemoveAddress = createAsyncThunk('user/removeaddress', API_REMOVE_ADDRESS);
export const UploadFile = createAsyncThunk('user/uploadfile', API_UPLOAD_FILE);
export const SendLink = createAsyncThunk('user/sendlink', API_SEND_LINK);
export const ChangePass = createAsyncThunk('user/updatepass', API_CHANGE_PASS);
export const LogOut = createAsyncThunk('user/updatepass', API_LOGOUT);
export const AddToCart = createAsyncThunk('user/addtocart',API_ADDTOCART)
export const GetCartItems = createAsyncThunk('user/getcartitems',API_GETCARTITEMS)
export const UpdateQty = createAsyncThunk('user/updateqty',API_UPDATE_QTY)
export const DeleteCartItem = createAsyncThunk('user/updateqty',API_DELETE_CARTITEM)
export const AddToWishlist = createAsyncThunk('user/addtowishlist',API_ADDTO_WISHLIST)
export const GetWishListItems = createAsyncThunk('user/getwishlistitem',API_GET_WISHLIST)
export const RemoveWishlistItem = createAsyncThunk('user/removewishlistitem',API_REMOVE_WISHLISTITEM)


//category
export const AddNewCategory = createAsyncThunk('category/addcategory', API_ADD_CATEGORY);
export const AddSubCategory = createAsyncThunk('category/addsubcategory', API_ADD_SUBCATEGORY);
export const GetCategories = createAsyncThunk('category/getcategories', API_GET_CATEGORIES);


//product
export const AddProduct = createAsyncThunk('product/addproduct',API_ADD_PRODUCT)
export const GetProducts = createAsyncThunk('product/getproducts',API_GET_PRODUCT)
export const GetFilterProducts = createAsyncThunk('product/getfilterproducts',API_GET_FILTERPRODUCT)
export const GetPopularProducts = createAsyncThunk('product/getpopularproducts',API_GET_POPULARPRODUCT)
export const GetSingleProduct = createAsyncThunk('product/getsingleproduct',API_GET_SINGLEPRODUCT)
export const SubmitReview = createAsyncThunk('product/submitreview',API_SUBMIT_REVIEW)
export const DeleteReview = createAsyncThunk('product/deletereview',API_DELETE_REVIEW)
export const SimilarProducts = createAsyncThunk('product/similarproducts',API_SIMILAR_PRODUCT)


//order
export const CreatePayment = createAsyncThunk('/order/payment/createpayment',API_CREATE_PAYMENT)
export const Verifypayment = createAsyncThunk('/order/payment/verifypayment',API_VERIFY_PAYMENT)
export const GetOrders = createAsyncThunk('/order/getorders',API_GET_ORDERS)
export const GetStatus = createAsyncThunk('/order/getstatus',API_GET_STATUS)