import axios from "axios"
import throwError from "./throwError"
import {toast} from 'react-toastify'
import {API_SEND_OTP} from './typeAlias'

const URL = process.env.NEXT_PUBLIC_BACKEND

const API_SEND_OTP = async ({email,setStartTimer}:API_SEND_OTP) =>{
   try {
    const response = await axios.post(`${URL}/otp/sendotp`, { email })
    toast.success(response.data.message)
    setStartTimer(true)
    return response.data;
   } catch (error:any) {
    throwError(error)
   }
}

export { API_SEND_OTP }
