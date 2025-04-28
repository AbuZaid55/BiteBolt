import throwError from "./throwError";
import axios from "axios";
import {toast} from 'react-toastify'
import type { 
    API_CREATE_PAYMENT, API_UPDATE_DETAILS,
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

const API_GET_STATUS = async(data:{orderId:string}) => {
    try { 
       const response = await axios.post(`${URL}/order/getstatus`,data)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

const API_UPDATE_DETAILS = async(data:API_UPDATE_DETAILS) => {
    try { 
       const response = await axios.post(`${URL}/order/updatedetails`,data,{withCredentials:true})
       toast.success(response.data.message)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

const API_CANCLE_ORDER = async(data:{orderId:string}) => {
    try { 
       const response = await axios.post(`${URL}/order/cancleorder`,data,{withCredentials:true})
       toast.success(response.data.message)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

const API_GET_ADMIN_ORDERS = async(data:{search:string,searchType:string}) => {
    try { 
       const response = await axios.post(`${URL}/order/getadminorders`,data,{withCredentials:true})
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

const API_CHAGE_STATUS = async(data:{orderId:string,value:string}) => {
    try { 
       const response = await axios.post(`${URL}/order/changestatus`,data,{withCredentials:true})
       toast.success(response.data.message)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

const API_GET_ORDERS_LENGTH = async() => {
    try { 
       const response = await axios.get(`${URL}/order/getorderslength`)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}


export {
    API_CREATE_PAYMENT,
    API_VERIFY_PAYMENT,
    API_GET_ORDERS,
    API_GET_STATUS,
    API_UPDATE_DETAILS,
    API_CANCLE_ORDER,
    API_GET_ADMIN_ORDERS,
    API_CHAGE_STATUS,
    API_GET_ORDERS_LENGTH,
}
