import {createSlice} from '@reduxjs/toolkit'
import { AddProduct } from '../asyncThunk'

interface initialState {
    name:string,
    stock:number,
    price:number,
    category:string,
    subCategory:string,
    description:string,
    popularList:boolean,
    thumbnail:{secure_url:string},
    images:string[],
    reviews:{
        userId:string,
        name:string,
        profile:{secure_url:string},
        rating:number,
        comment:string,
    }[],
    createdAt:Date,
}

const initialState:initialState[] = []

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(AddProduct.fulfilled,(state,action)=>{
            console.log(action)
        })
    }
})

export default productSlice;