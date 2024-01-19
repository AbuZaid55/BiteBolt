import axios from "axios"
import throwError from "./throwError"
import {toast} from 'react-toastify'
import {
   API_SEND_OTP,
   API_SING_UP,
   API_LOGIN,
   API_CHANGE_NAME,
   API_ADD_ADDRESS,
   API_CHANGE_PASS,
} from './typeAlias'

const URL = process.env.NEXT_PUBLIC_BACKEND 

const API_SEND_OTP = async ({email,setStartTimer}:API_SEND_OTP) =>{
   try {
    const response = await axios.post(`${URL}/otp/sendotp`, { email })
    toast.success(response.data.message)
    setStartTimer(true)
    return response.data;
   } catch (error) {
    throwError(error)
   }
}

const API_SING_UP = async(data:API_SING_UP) => {
   try {
      const response = await axios.post(`${URL}/user/signup`,data)
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }
}

const API_LOGIN = async(data:API_LOGIN) => {
   try {
      const response = await axios.post(`${URL}/user/login`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }
}

const API_GET_USER = async() => {
   try {
      const response = await axios.get(`${URL}/user/getuser`,{withCredentials:true})
      return response.data;
   } catch (error) {
      throw new Error("UnAuthorized User!")
   }
}

const API_CHANGE_NAME = async(data:API_CHANGE_NAME) => {
   try {
      const response = await axios.post(`${URL}/user/changename`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }
}

const API_ADD_ADDRESS = async(data:API_ADD_ADDRESS) => {
   (data._id==="1") ? data._id="" :data._id
   try { 
      const response = await axios.post(`${URL}/user/addaddress`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }
}

const API_REMOVE_ADDRESS = async(data:{addressId:string}) => {
   try { 
      const response = await axios.post(`${URL}/user/removeaddress`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }
}

const API_UPLOAD_FILE = async(data:any) => {
   try { 
      const response = await axios.post(`${URL}/user/uploadfile`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }
}

const API_SEND_LINK = async({email}:{email:string}) => {
   try { 
      const response = await axios.post(`${URL}/changepass/sendlink`,{email})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }
}

const API_CHANGE_PASS = async(data:API_CHANGE_PASS) => {
   try { 
      const response = await axios.post(`${URL}/changepass/updatepass`,data)
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }
}

const API_LOGOUT = async() => {
   try { 
      const response = await axios.get(`${URL}/user/logout`,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }
}

const API_ADDTOCART = async(data:{productId:string,qty:number})=>{
   try { 
      const response = await axios.post(`${URL}/user/addtocart`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_GETCARTITEMS = async()=>{
   try { 
      const response = await axios.get(`${URL}/user/getcartitems`,{withCredentials:true})
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_UPDATE_QTY = async(data:{opr:string,productId:string})=>{
   try { 
      const response = await axios.post(`${URL}/user/updateqty`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_DELETE_CARTITEM = async(data:{productId:string})=>{
   try { 
      const response = await axios.post(`${URL}/user/deletecartitem`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_ADDTO_WISHLIST = async(data:{productId:string})=>{
   try { 
      const response = await axios.post(`${URL}/user/addtowishlist`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_GET_WISHLIST = async()=>{
   try { 
      const response = await axios.get(`${URL}/user/getwishlistitem`,{withCredentials:true})
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_REMOVE_WISHLISTITEM = async(data:{productId:string})=>{
   try { 
      const response = await axios.post(`${URL}/user/removewishlistitem`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_GET_ALL_USERS = async(data:{admin:string})=>{
   try { 
      const response = await axios.post(`${URL}/user/getAllUser`,data,{withCredentials:true})
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_CHANGE_USER_TYPE = async(data:{userId:string,type:string})=>{
   try { 
      const response = await axios.post(`${URL}/user/changeusertype`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_SEARCH_USER = async(data:{searchStr:string})=>{
   try { 
      const response = await axios.post(`${URL}/user/searchuser`,data,{withCredentials:true})
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_DELETE_USER = async(data:{userId:string})=>{
   try { 
      const response = await axios.post(`${URL}/user/deleteuser`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_GET_USERS_LENGTH = async()=>{
   try { 
      const response = await axios.get(`${URL}/user/getuserslength`)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

export { 
   API_SEND_OTP,
   API_SING_UP,API_LOGIN,
   API_GET_USER,
   API_CHANGE_NAME,
   API_ADD_ADDRESS,
   API_REMOVE_ADDRESS,
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
   API_GET_ALL_USERS,
   API_CHANGE_USER_TYPE,
   API_SEARCH_USER,
   API_DELETE_USER,
   API_GET_USERS_LENGTH,
}
