import {createSlice} from '@reduxjs/toolkit'
import { AddNewCategory, AddSubCategory, GetCategories } from '../asyncThunk'

interface initialState {
    highestPrice:number,
    categories:{
        _id:string,
        name:string,
        subCategories:{
            _id:string,
            name:string,
        }[]
    }[]
}

const initialState:initialState = {
    highestPrice:0,
    categories:[]
}

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(AddNewCategory.fulfilled,(state,action)=>{
            state.categories.push(action.payload.data)
            return state;
        })
        builder.addCase(AddSubCategory.fulfilled,(state,action)=>{
            const newList = state.categories.filter((category)=>{
                if(category.name===action.payload.data.category){
                    category.subCategories.push(action.payload.data.subCategory)
                }
                return category;
            })
            state.categories=newList
            return state;
        })
        builder.addCase(GetCategories.fulfilled,(state,action)=>{
            state.highestPrice = action.payload.data.highestPrice
            state.categories = action.payload.data.categories
        })
    }
})

export default categorySlice;