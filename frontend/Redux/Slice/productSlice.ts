import {createSlice} from '@reduxjs/toolkit'
import { AddProduct, GetFilterProducts, GetProducts } from '../asyncThunk'

interface initialStatetype {
    _id:string,
    name:string,
    stock:number,
    price:number,
    category:string,
    subCategory:string,
    description:string,
    popularList:boolean,
    thumbnail:{secure_url:string},
    images:{secure_url:string[]},
    rating:Number,
    reviews:{
        userId:string,
        name:string,
        profile:{secure_url:string},
        rating:number,
        comment:string,
    }[],
    createdAt:Date,
}

let initialState: {
    product: initialStatetype[];
    filterProducts: initialStatetype[];
} = {
    product: [],
    filterProducts: [],
};


const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(AddProduct.fulfilled,(state,action)=>{})
        builder.addCase(GetProducts.fulfilled,(state,action)=>{
            state.product=action.payload.data
            return state;
        })
        builder.addCase(GetFilterProducts.fulfilled,(state,action)=>{
           state.filterProducts=action.payload.data
           return state;
        })
    }
})

export default productSlice;