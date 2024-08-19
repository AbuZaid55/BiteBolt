import {createSlice} from '@reduxjs/toolkit'
import { AddProduct, GetFilterProducts, GetPopularProducts, GetProducts } from '../asyncThunk'

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
    rating:number,
    reviews:{
        userId:{
            _id:string,
            name:string,
            profile:{secure_url:string}
        },
        rating:number,
        comment:string,
    }[],
    createdAt:Date,
}

let initialState: {
    appliedFilter:{
        search:string,
        selectedCat:{category:string,subCategory:string}[],
        filterPrice:number,
        filterRating:number,
    }
    product: initialStatetype[];
    filterProducts: initialStatetype[];
    popularProduct: initialStatetype[];
    pageforpopularProduct:number,
    hashMore:boolean
} = {
    appliedFilter:{
        search:'',
        selectedCat:[],
        filterPrice:0,
        filterRating:0
    },
    product: [],
    filterProducts: [],
    popularProduct:[],
    pageforpopularProduct:0,
    hashMore:true,
};


const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setFilterDetails(state,action){
            state.filterProducts=[]
            state.appliedFilter.search = action.payload.search
            state.appliedFilter.selectedCat = action.payload.selectedCat
            state.appliedFilter.filterPrice = action.payload.filterPrice
            state.appliedFilter.filterRating = action.payload.filterRating
            return state;
        },
        clearAllFilter(state){
            state.appliedFilter={
                search:'',
                selectedCat:[],
                filterPrice:0,
                filterRating:0
            }
            state.filterProducts=[]
            return state;
        },
        setPage(state,action){
            state.pageforpopularProduct = action.payload
            return state;
        },
        setHashMore(state,action){
            state.hashMore=action.payload
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
        builder.addCase(GetPopularProducts.fulfilled,(state,action)=>{
           state.popularProduct=[...state.popularProduct,...action.payload.data]
           if(action.payload.data.length==0){
            state.pageforpopularProduct=-1
           }
           return state;
        })
    }
})

export default productSlice;
export const {setFilterDetails,clearAllFilter,setPage,setHashMore} = productSlice.actions