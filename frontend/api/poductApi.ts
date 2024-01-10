import throwError from "./throwError";
import axios from "axios";
import {toast} from 'react-toastify'
import { 
    API_ADD_PRODUCT, 
} from './typeAlias'

const URL = process.env.NEXT_PUBLIC_BACKEND 

const API_ADD_PRODUCT = async(data:API_ADD_PRODUCT) => {
    try { 
       const response = await axios.get(`${URL}/product/addproduct`)
       toast.success(response.data.message)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

export {
    API_ADD_PRODUCT
}