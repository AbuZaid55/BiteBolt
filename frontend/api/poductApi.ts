import throwError from "./throwError";
import axios from "axios";
import {toast} from 'react-toastify'
import { API_GET_FILTERPRODUCT, API_SUBMIT_REVIEW } from './typeAlias'

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

const API_GET_POPULARPRODUCT = async(data:{page:number}) => {
    try { 
       const response = await axios.post(`${URL}/product/getpopularproducts`,data)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

const API_GET_SINGLEPRODUCT = async(data:{_id:string}) => {
    try { 
       const response = await axios.post(`${URL}/product/getsingleproducts`,data)
       return response.data;
    } catch (error) {
       throwError(error)
    }
   }
   
const API_SUBMIT_REVIEW = async(data:API_SUBMIT_REVIEW)=>{
   try { 
      const response = await axios.post(`${URL}/product/submitreview`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}
const API_DELETE_REVIEW = async(data:{userId:string,productId:string})=>{
   try { 
      const response = await axios.post(`${URL}/product/deletereview`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_SIMILAR_PRODUCT = async(data:{_id:string,page:number})=>{
   try { 
      const response = await axios.post(`${URL}/product/similarproducts`,data)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

export {
    API_ADD_PRODUCT,
    API_GET_PRODUCT,
    API_GET_FILTERPRODUCT,
    API_GET_POPULARPRODUCT,
    API_GET_SINGLEPRODUCT,
    API_SUBMIT_REVIEW,
    API_DELETE_REVIEW,
    API_SIMILAR_PRODUCT,
}