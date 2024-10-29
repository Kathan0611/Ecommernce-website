import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');


  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const dataResponse= await fetch(SummaryApi.ForgotPassword.url,{
      method:SummaryApi.ForgotPassword.method,
      credentials:'include',
      headers:{ 
        "content-type":"application/json"
      },
      body:JSON.stringify({email:email})
    })

     const dataApi = await dataResponse.json();
     console.log("data",dataApi)

     if(dataApi.success){
         toast.success(dataApi.message)
         navigate('/reset-password')
     }
    
     if(dataApi.error){
       console.log(dataApi.error)
      toast.error(dataApi.message)
     }
       
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full p-2 text-white bg-red-600 rounded-md hover:bg-red-600">
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-center">
          Remember your password?{' '}
          <a href="/login" className="text-red-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
