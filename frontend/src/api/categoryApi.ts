import axios from "axios"
import throwError from "./throwError"
import {toast} from 'react-toastify'
import { 
    API_ADD_CATEGORY, 
    API_ADD_SUBCATEGORY,
} from './typeAlias'

const URL = process.env.NEXT_PUBLIC_BACKEND 

const API_ADD_CATEGORY = async(data:API_ADD_CATEGORY) => {
    try { 
       const response = await axios.post(`${URL}/category/addcategory`,data,{withCredentials:true})
       toast.success(response.data.message)
       return response.data;
    } catch (error) {
       throwError(error)
    }
 }

const API_ADD_SUBCATEGORY = async(data:API_ADD_SUBCATEGORY) => {
    try { 
       const response = await axios.post(`${URL}/category/addsubcategory`,data,{withCredentials:true})
       toast.success(response.data.message)
       return response.data;
    } catch (error) {
       throwError(error)
    }
 }

const API_GET_CATEGORIES = async() => {
    try { 
       const response = await axios.get(`${URL}/category/getcategories`)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

const API_DELETE_SUBCAT = async(data:{subCatId:string,catId:string}) => {
    try { 
       const response = await axios.post(`${URL}/category/deletesubcategory`,data,{withCredentials:true})
       toast.success(response.data.message)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

const API_DELETE_CAT = async(data:{_id:string}) => {
    try { 
       const response = await axios.post(`${URL}/category/deletecategory`,data,{withCredentials:true})
       toast.success(response.data.message)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

const API_GET_CATEGORIES_LENGTH = async() => {
    try { 
       const response = await axios.get(`${URL}/category/categorieslength`)
       return response.data;
    } catch (error) {
       throwError(error)
    }
}

export {
    API_ADD_CATEGORY,
    API_ADD_SUBCATEGORY,
    API_GET_CATEGORIES,
    API_DELETE_SUBCAT,
    API_DELETE_CAT,
    API_GET_CATEGORIES_LENGTH,
}