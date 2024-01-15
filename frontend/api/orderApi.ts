import throwError from "./throwError";
import axios from "axios";
import {toast} from 'react-toastify'
import { 
    API_CREATE_PAYMENT,
} from './typeAlias'

const URL = process.env.NEXT_PUBLIC_BACKEND 

const API_CREATE_PAYMENT = async(data:API_CREATE_PAYMENT) => {
    try { 
       const response = await axios.post(`${URL}/order/payment/createpayment`,data,{withCredentials:true})
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

const API_VERIFY_PAYMENT = async(data:any) => {
    try { 
       const response = await axios.post(`${URL}/order/payment/verifypayment`,data,{withCredentials:true})
       toast.success(response.data.message)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

const API_GET_ORDERS = async() => {
    try { 
       const response = await axios.get(`${URL}/order/getorders`,{withCredentials:true})
       return response.data;
    } catch (error) {
       throwError(error)
    }
}


export {
    API_CREATE_PAYMENT,
    API_VERIFY_PAYMENT,
    API_GET_ORDERS,
}
