



const backendDomain='http://localhost:5000'
const SummaryApi = {
     Signup:{
        url:`${backendDomain}/api/v1/signup`,
        method:'post'
     },
     Login:{
       url:`${backendDomain}/api/v1/login`,
       method:'post'
     },
     current_user:{
      url:`${backendDomain}/api/v1/userdetails`,
      method:'get'
     },
     logout_user:{
       url:`${backendDomain}/api/v1/logout`,
       method:'get'
     },
     allUser:{
       url:`${backendDomain}/api/v1/alluser`,
       method:'get'
     },
     updateUser:{
      url:`${backendDomain}/api/v1/updateUser`,
      method:'post'
     },
     uploadProduct:{
      url:`${backendDomain}/api/v1/upload-Product`,
      method:'post'
     },
     showAllProduct:{
      url:`${backendDomain}/api/v1/getAllProduct`,
      method:'get'
     },
     updateProduct:{
      url:`${backendDomain}/api/v1/update-product`,
      method:'post'
     },
     categoryProduct:{
      url:`${backendDomain}/api/v1/get-categoryProduct`,
      method:'get'
     },
     categoryWiseproduct:{
      url:`${backendDomain}/api/v1/category-product`,
      method:'post'
     },
     productDetails:
     {
        url:`${backendDomain}/api/v1/product-details`,
        method:'post'
     },
     addToCartModel:{
      url:`${backendDomain}/api/v1/addToCart`,
      method:'post'
     },
     addToCartProductCount:{
       url:`${backendDomain}/api/v1/countAddToCartProduct`,
       method:'get'
     },
     addToCartViewProduct:{
       url:`${backendDomain}/api/v1/view-card-product`,
       method:'get'
     },
     updateCartProduct:{
        url:`${backendDomain}/api/v1/update-cart-product`,
        method:'post'
     },
     deleteCartProduct:{
       url:`${backendDomain}/api/v1/delete-cart-product`,
       method:'post'
     },
     searchProduct:{
      url:`${backendDomain}/api/v1/search`,
      method:'get'
     }
    
}

export default SummaryApi;
