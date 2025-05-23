import throwError from "./throwError";
import axios from "axios";
import {toast} from 'react-toastify'
import type { API_GET_FILTERPRODUCT, API_SUBMIT_REVIEW, API_UPDATE_PRODUCT } from './typeAlias'

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

const API_GET_ADMIN_PRODUCT = async(data:{search:string,searchType:string,page:number})=>{
   try { 
      const response = await axios.post(`${URL}/product/getadminproducts`,data,{withCredentials:true})
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_UPDATE_PRODUCT = async(data:API_UPDATE_PRODUCT)=>{
   try { 
      const response = await axios.post(`${URL}/product/updateproduct`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_DELETE_PRODUCT = async(data:{productId:string})=>{
   try { 
      const response = await axios.post(`${URL}/product/deleteproduct`,data,{withCredentials:true})
      toast.success(response.data.message)
      return response.data;
   } catch (error) {
      throwError(error)
   }   
}

const API_GET_PRODUCTS_LENGHT = async()=>{
   try { 
       const response = await axios.get(`${URL}/product/getproductslength`)
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
    API_GET_ADMIN_PRODUCT,
    API_UPDATE_PRODUCT,
    API_DELETE_PRODUCT,
    API_GET_PRODUCTS_LENGHT,
}