import throwError from "./throwError";
import axios from "axios";
import {toast} from 'react-toastify'
import { 
} from './typeAlias'

const URL = process.env.NEXT_PUBLIC_BACKEND 

const API_ADD_PRODUCT = async(data:FormData) => {
    try { 
       const response = await axios.post(`${URL}/product/addproduct`,data,{withCredentials:true})
       toast.success(response.data.message)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

export {
    API_ADD_PRODUCT
}