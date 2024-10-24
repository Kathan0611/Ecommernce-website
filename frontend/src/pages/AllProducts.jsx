import React,{useEffect, useState} from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct]=useState(false);

  const[allProduct,setAllProduct]=useState([]);

  const fetchAllProducts = async()=>{
    const response= await fetch(SummaryApi.showAllProduct.url,{
      method:SummaryApi.showAllProduct.method,
      credentials:'include'
    })
    const dataResponse=await response.json()
    console.log(response,"data")
    console.log("data",dataResponse) 
    setAllProduct(dataResponse.data || []);
  }

  useEffect(()=>{
    fetchAllProducts()
  },[])

  return (
    <div>
    
    <div className='bg-white py-2 px-4 flex justify-between items-center'>
      <h2 className='font-bold text-lg'>All Product</h2>
      <button className='border-2 py-1 px-4 rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
    </div>
    <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
     { 
       allProduct.map((product,index)=>{
             return (
              <AdminProductCard data={product} key={index+'allProduct'} fetchdata={fetchAllProducts}/>
              
             )
      })

      }
    </div>
    {
      openUploadProduct && (
        <UploadProduct onClose={(()=>setOpenUploadProduct(false))} fetchdata={fetchAllProducts}/>
      )
    }
    </div>
  )
}

export default AllProducts