import throwError from "./throwError";
import axios from "axios";
import {toast} from 'react-toastify'
import { API_GET_FILTERPRODUCT } from './typeAlias'

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

const API_GET_PRODUCT = async() => {
    try { 
       const response = await axios.get(`${URL}/product/getproducts`)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

const API_GET_FILTERPRODUCT = async(appliedFilters:API_GET_FILTERPRODUCT) => {
    try { 
       const response = await axios.post(`${URL}/product/getfilterproducts`,appliedFilters)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

export {
    API_ADD_PRODUCT,
    API_GET_PRODUCT,
    API_GET_FILTERPRODUCT,

}