import SummaryApi from "../common"
import {toast} from 'react-toastify';
const addToCart =async(e,id)=>{
    e?.stopPropagation()
    e?.preventDefault()
     console.log(id,"kl")

    const response=await fetch(SummaryApi.addToCartModel.url,{
        method:SummaryApi.addToCartModel.method,
        credentials:'include',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(
            {productId: id},
        )
    })
   
    const responseData=await response.json();
    console.log(responseData.error,"mihir")
    if(responseData.success){
        toast.success(responseData.message)
    }

    if(responseData.error){
        toast.error(responseData.message)
    }

    return responseData

}
export default addToCart