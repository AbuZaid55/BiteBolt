import axios from "axios"
import throwError from "./throwError"
import {toast} from 'react-toastify'


const URL = process.env.NEXT_PUBLIC_BACKEND 

const API_GET_PAYMENT = async(data:{search:string,page:number})=>{
    try { 
        const response = await axios.post(`${URL}/payment/getpayment`,data,{withCredentials:true})
        return response.data;
     } catch (error) {
        throwError(error)
     }
}

const API_DELETE_PAYMENT = async(data:{_id:string})=>{
    try { 
        const response = await axios.post(`${URL}/payment/deletepayment`,data,{withCredentials:true})
        toast.success(response.data.message)
        return response.data;
     } catch (error) {
        throwError(error)
     }
}

const API_GET_TOTAL_PAYMENT = async()=>{
    try { 
        const response = await axios.get(`${URL}/payment/gettotalpayment`,{withCredentials:true})
        return response.data;
     } catch (error) {
        throwError(error)
     }
}

const API_GET_CHART_PAYMENT = async(data:{page:number})=>{
    try { 
        const response = await axios.post(`${URL}/payment/getchartpayment`,data,{withCredentials:true})
        return response.data;
     } catch (error) {
        throwError(error)
     }
}

export {
    API_GET_PAYMENT,
    API_DELETE_PAYMENT,
    API_GET_TOTAL_PAYMENT,
    API_GET_CHART_PAYMENT
}