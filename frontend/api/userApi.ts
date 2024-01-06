import axios from "axios"
const URL = process.env.NEXT_PUBLIC_BACKEND
const API_SEND_OTP = async()=>{
    try {
        const res = await axios.post(`${URL}/sendotp`)
        console.log(res)
        return true
    } catch (error) {
        return error;
    }
}


export {
    API_SEND_OTP,
}