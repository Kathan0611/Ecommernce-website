import SummaryApi from "../common"

const fetchCategoryWiseProduct=async (category)=>{
  
    const response= await fetch(SummaryApi.categoryWiseproduct.url,{
        method:SummaryApi.categoryWiseproduct.method,
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            category:category
        })
    })

    const dataResonse= await response.json();
    console.log(response,"datakl")

    return dataResonse
}

export default fetchCategoryWiseProduct;
