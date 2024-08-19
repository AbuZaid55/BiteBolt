import React, {Dispatch,SetStateAction} from 'react'
export type API_SEND_OTP = {
    email:string;
    setStartTimer:Dispatch<SetStateAction<boolean>>

}

export type API_SING_UP = {
    name:string,
    email:string,
    password:string,
    confirm_pass:string,
    otp:string,
}

export type API_LOGIN = {
    email:string,
    password:string,
}

export type API_CHANGE_NAME = {
    _id:string,
    name:string
}

export type API_ADD_ADDRESS = {
    _id:string,
    name:string,
    houseNo:string,
    address:string,
    pinCode:number,
    city:string,
    state:string,
    phoneNo:number
}

export type API_CHANGE_PASS = {
    password:string,
    confirm_pass:string,
    token:string,
}
export type API_ADD_CATEGORY = {
    category:string,
}
export type API_ADD_SUBCATEGORY = {
    category:string,
    subCategory:string
}
export type API_GET_FILTERPRODUCT = {
    search:string,
    selectedCat:{
        category:string,
        subCategory:string,
    }[]
    filterPrice:number,
    filterRating:number,
    page:number
}
export type API_SUBMIT_REVIEW = {
    userId:string,
    rating:number,
    comment:string,
    productId:string,
}
export type API_CREATE_PAYMENT = {
    _id:string,
    name:string,
    phoneNo:number,
    pinCode:string,
    houseNo:string,
    city:string,
    state:string,
    address:string,
}

export type API_UPDATE_DETAILS = {
    _id:string,
    orderId:string,
    name:string,
    phoneNo:number,
    pinCode:string,
    houseNo:string,
    city:string,
    state:string,
    address:string,
}
export type API_UPDATE_PRODUCT = {
    _id:string,
    name:string,
    stock:number,
    price:number,
    description:string
    popularList:any,
}

export type API_CONTACT = {
    name:string,
    email:string,
    phoneNo:string,
    subject:string,
    message:string,
}
