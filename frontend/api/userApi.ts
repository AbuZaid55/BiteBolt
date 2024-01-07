import axios from "axios"
import throwError from "./throwError"
import {toast} from 'react-toastify'
import {API_SEND_OTP,API_SING_UP} from './typeAlias'

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
      return response.data.data;
   } catch (error) {
      throwError(error)
   }
}

export { API_SEND_OTP ,API_SING_UP}
