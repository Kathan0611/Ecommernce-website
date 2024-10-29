import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const dataResponse= await fetch(SummaryApi.ResetPassword.url,{
        method:SummaryApi.ResetPassword.method,
        credentials:'include',
        headers:{ 
          "content-type":"application/json"
        },
        body:JSON.stringify({
            otp:otp,
            newPassword:newPassword
        })
      })

       const dataApi = await dataResponse.json();
       console.log("data",dataApi)

       if(dataApi.success){
           toast.success(dataApi.message)
           navigate('/login')
           
       }
      
       if(dataApi.error){
         console.log(dataApi.error)
        toast.error(dataApi.message)
       }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="otp">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="new-password">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="confirm-password">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full p-2 text-white bg-red-600 rounded-md hover:bg-red-600">
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-center">
          Remembered your password?{' '}
          <a href="/" className="text-red-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
