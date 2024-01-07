import React, {Dispatch,SetStateAction} from 'react'
export type API_SEND_OTP = {
    email:string;
    setStartTimer:Dispatch<SetStateAction<boolean>>

}