import { toast } from "react-toastify"

const throwError = (error:any) =>{
    if(error.response && error.response.data){
        toast.error(error.response.data.message)
        throw new Error(error.response.data.message)
    }else{
        toast.error("Server Error!")
        throw new Error("Server Error!")
    }
}

export default throwError;