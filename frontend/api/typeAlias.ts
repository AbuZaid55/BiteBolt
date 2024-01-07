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
