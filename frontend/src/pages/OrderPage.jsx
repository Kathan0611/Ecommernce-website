import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const OrderPage = () => {
   const[data,setData]=useState([]);

    const fetchOrderDetails=async()=>{
    try{

      const response=await fetch(SummaryApi.getOrder.url,{
        method:SummaryApi.getOrder.method,
        credentials:'include',
        headers:{
          'content-type':'application/json'
        }
      })

      const responseData=await response.json();
      setData(responseData.data)
      console.log("responseData.data",data);
    }
    catch(error){
        console.error('Error fetching order details:',error)
    } 
   }

   useEffect(()=>{
    fetchOrderDetails();
  },[])

    
  return (
    <div>
       {
      !data && (
        <p>No Order available</p>
      )
      }
      <div className='p-4 w-full max-w-lg '>
        {
             data &&
             data?.map((item,index)=>{
              return (
               <div key={item.useId+index}>
               <p className='font-medium text-lg'>{moment(item.createAt).format('LL')}</p>
               <div className='border rounded'>
               <div className='flex flex-col lg:flex-row justify-between border-2'>
               <div className='grid gap-1'>
                {
                  // item?.ProductDetails.map((product,index)=>{
                    //  console.log(product,"product")
                    // return(
                      <div key={data._id+index} className='flex gap-3  bg-slate-200'>
                         <img src={item?.ProductDetails[1]}
                          className='w-28 h-32 bg-slate-200 object-scale-down p-2'/>
                          <div className='font-medium text-lg text-ellipsis line-clamp-2 flex-grow'>
                           <div>{item?.ProductDetails[0]}</div>
                           <div className='flex flex-col items-center gap-5 mt-1'>
                           <div className='text-lg text-red-500'>{displayINRCurrency(item?.ProductDetails[2])}</div>
                            <p>Quantity:{item?.quantity}</p>
                          </div> 
                          </div>
                        
                        </div>
                    // )
                  // }
                // )
                }
                </div>
               <div className>
               <div className='flex flex-col gap-4 p-2 min-w-[100px]'>
                  <div>
                  <div className='text-lg font-medium'>Payment Details:</div>
                            <p className='ml-1 capitalize'>Payment method:{item.paymentDetails.payment_method_type[0]}</p>
                            <p className='ml-1 capitalize'>Payment status:{item.paymentDetails.payment_status}</p>
                            </div>
                     </div>
                </div>
                </div>
                    <div className='font-semibold ml-auto w-fit lg:text-lg'>
                      Total Amount:{item.totalAmount}
                      </div>
                </div>
               </div>
              )
              }
           )
        }
         
        </div>
    </div>
  )
}

export default OrderPage