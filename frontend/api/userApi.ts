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
      const response = await axios.post(`${URL}/user/logout`)
      toast.success(response.data.message)
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
   API_UPLOAD_FILE,
   API_SEND_LINK,
   API_CHANGE_PASS,
   API_LOGOUT,
}
