import React,{ useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common/index.js'
import Context from './context/index.js'
import { setUserDetails } from './store/userSlice.js'
import {useDispatch} from 'react-redux';
 

function App ()

{
  
  const dispatch =useDispatch();
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails= async ()=>{
       
       const dataResponse= await fetch(SummaryApi.current_user.url,{
        method:SummaryApi.current_user.method,
        credentials:'include',
        headers:{
          "content":'application/json'
        }
       })
       const dataApi= await dataResponse.json()
       
        if(dataApi.success){
              dispatch(setUserDetails(dataApi.data))
        }
       console.log("dataUser",dataResponse)
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()
    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    fetchUserDetails()
    fetchUserAddToCart()
  },[])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart
      }}>
      <ToastContainer position='top-center'/>
      <div className='text-600'>
       <Header/>
       <main className='min-h-[calc(100vh-120px)] pt-20'>
       <Outlet/>
       </main>
       <Footer/>
      </div>
      </Context.Provider>
      
    </>
  )
}

export default App

