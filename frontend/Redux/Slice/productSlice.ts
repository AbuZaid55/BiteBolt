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
    appliedFilter:{
        selectedCat:{category:string,subCategory:string}[],
        filterPrice:number,
        filterRating:number,
    }
    product: initialStatetype[];
    filterProducts: initialStatetype[];
    popularProduct: initialStatetype[];
} = {
    appliedFilter:{
        selectedCat:[],
        filterPrice:0,
        filterRating:0
    },
    product: [],
    filterProducts: [],
    popularProduct:[]
};


const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setFilterDetails(state,action){
            state.filterProducts=[]
            state.appliedFilter.selectedCat = action.payload.selectedCat
            state.appliedFilter.filterPrice = action.payload.filterPrice
            state.appliedFilter.filterRating = action.payload.filterRating
            return state;
        },
        clearAllFilter(state){
            state.appliedFilter={
                selectedCat:[],
                filterPrice:0,
                filterRating:0
            }
            state.filterProducts=[]
            return state;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(AddProduct.fulfilled,(state,action)=>{})
        builder.addCase(GetProducts.fulfilled,(state,action)=>{
            state.product=action.payload.data
            return state;
        })
        builder.addCase(GetFilterProducts.fulfilled,(state,action)=>{
           state.filterProducts=[...state.filterProducts,...action.payload.data]
           return state;
        })
    }
})

export default productSlice;
export const {setFilterDetails,clearAllFilter} = productSlice.actions