import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {

    const [categoryProduct,setCategoryProduct]=useState([]);
    const[loading,setloading]=useState(false)

    const categoryLoading =new Array(13).fill(null)

    const fetchCategoryProduct=async()=>{
         setloading(true)
        const repsonse=await fetch(SummaryApi.categoryProduct.url,{
            method:SummaryApi.categoryProduct.method
        })
        setloading(false)
        const dataResponse=await repsonse.json();
        setCategoryProduct(dataResponse.data);
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])
  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
           {

            loading? (
                
                    categoryLoading.map((el,index)=>{
                        return (
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden  bg-slate-200 animate-pulse' key={'categoryLoading'+index}>

                                </div>
                        )
                    }) 
                // <div className='h-10 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200'>

                //     </div>
            ):(
                categoryProduct.map((product,index)=>{
                    return(
                        <Link to={'/product-category/'+ product?.category} className='cursor-pointer'>
                            <div className='w-32 h-48 md:w-20 md:h-20 rounded-full overflow-hidden p-4  flex items-center justify-center'>
                                <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down  hover:scale-125 transition-all'/>
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                    )
                })
            )
       
    }
    </div>
    </div>
  )
}

export default CategoryList