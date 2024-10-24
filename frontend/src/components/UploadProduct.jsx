import React, { useState } from 'react'
import {CgClose} from 'react-icons/cg'
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadimages';
import DispalyImage from './DispalyImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';



const UploadProduct = (
    {onClose,fetchdata}
) => {
   
    const [data,setData]=useState({
        productName:"",
        brandName:"",
        category:"",
        productImage:[],
        description:"",
        price:"",
        sellingPrice:""
    })

    const [openfullScreenImage,setOpenfullScreenImage]=useState(false);
    const [fullScreenImage,setfullScreenImage]=useState("");

     const [uploadProductImageInput,setUploadProductImageInput]=useState("")
     
    const handleOnChange=(e)=>{
        
        const {name,value}=e.target;
      
        setData((preve)=>{
            return {
                ...preve,
               [name]:value
            }
          })  
    }

   const  handleUploadProduct= async(e)=>{
      const file=e.target.files[0];
      const uploadImageCloudinary =await uploadImage(file) 
      console.log(uploadImageCloudinary)
      setData((preve)=>{
        console.log(preve)
        return {
            ...preve,
            productImage:[...preve.productImage,uploadImageCloudinary.secure_url]
        }
      })
    console.log(data.productImage,"ll")

   }
   const handleDeleteProductImage=async(index)=>{
      
      const newProductImage =[...data.productImage]
      newProductImage.splice(index,1)

      setData((preve)=>{
        console.log(preve)
        return {
            ...preve,
            productImage:[...newProductImage]
        }
      })

   } 

    const handleSubmit=async(e)=> {
        e.preventDefault()
        const repsonse=await fetch(SummaryApi.uploadProduct.url,{
            method:SummaryApi.uploadProduct.method,
            credentials:'include',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })

        const responseData= await repsonse.json();

        console.log(responseData,"responseData");

        if(responseData.success){
            toast.success(responseData.messages)
            onClose()
            fetchdata()
        }

        if(responseData.error){
            toast.error(responseData.messages)
        }    

   }

  return (
    <div className='fix w-full h-full bg-slate-200 bg-opacity-35 z-10 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center cursor-pointer'>
    <div className='bg-white p-2 rounded-w-full w-1/2 max-h-[90%] overflow-hidden pb-3'>
        <div className='flex justify-between items-center pb-3'>
            <h2 className='font bold text-lg'>Upload Product</h2>
            <div className='w-fit ml-auto text-2xl hover:text-red-60' onClick={onClose}>
             <CgClose className='cursor-pointer'/>
     </div>
     </div>
       
         

         <form className='grid p-4 gap-2 overflow-y-scroll h-96 pb-5'>
            <label htmlFor='productName'>Product Name:</label>
            <input 
            type='text' 
            id='productName' 
            placeholder='enter product name' 
            name='productName'
            value={data.productName} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required/>

            <label htmlFor='brandName' className='mt-3'>Brand Name:</label>
            <input 
            type='text' 
            id='brandName' 
            placeholder='enter brand name' 
            name='brandName'
            value={data.brandName} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required/>

            <label htmlFor='category' className='mt-3'>Category:</label>
            <select value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'required>
                <option value={""}>select Category</option>
               {
                productCategory.map((el,index)=>{
                    return (
                        <option value={el.value} key={el.value+index} >{el.label}</option>
                    )
                })
               }
            </select>
            <label htmlFor='productImage' className='mt-3'>ProductImage:</label>
            <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
             <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
             <span className='text-4xl'><FaCloudUploadAlt /></span>
             <p className='text-sm'>Upload Product Image</p>
             <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} required/>
                </div>
            </div>
            </label>
            <div>
                {
                data?.productImage[0]?(
                    <div className='flex  items-center gap-2'>
                        {
                    data.productImage.map((el,index)=>{
                        return (
                        <div className='relative group'>
                            <img src={el}
                             alt={el} 
                             width={100}
                             height={60}
                             className='bg-slate-100' 
                             onClick={()=>{
                                setOpenfullScreenImage(true)
                                setfullScreenImage(el)
                            }}/>
                            <div className='absolute bottom-0 right-0 p-1 text-white rounded-full cursor-pointer hidden group-hover:block' onClick={()=>handleDeleteProductImage(index)}>
                                <MdDelete className='bg-red-600' onClick={()=>handleDeleteProductImage(index)} required/>
                                </div>
                        </div>
                            
                        )
                    })
                }
                </div>
                    ):(
                         <p className='text-red-600 text-xs'>Please Upload Image</p>
                    )
                }  
            </div>
            <label htmlFor='price' className='mt-3'>Price:</label>
            <input 
            type='number' 
            id='price' 
            placeholder='enter price' 
            name='price'
            value={data.price} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required/>
           <label htmlFor='sellingPrice' className='mt-3'>sellingPrice:</label>
            <input 
            type='number' 
            id='sellingPrice' 
            placeholder='enter-selling' 
            name='sellingPrice'
            value={data.sellingPrice} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required/>

            <label htmlFor='description'  className='mt-3'>Description:</label>
            <textarea className='h-28 bg-slate-100 border-resize-none p-1' name='description' value={data.description} placeholder='enter product description' rows={3} onChange={handleOnChange}
            ></textarea>
            <button className='px-3 py-1 bg-red-600 text-white pb-2 mb-5' onClick={handleSubmit}>Upload Product</button>
         </form>
    </div>
    {
        openfullScreenImage && (
            <DispalyImage onClose={()=>setOpenfullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
    }
         
    </div>
  )
}

export default UploadProduct