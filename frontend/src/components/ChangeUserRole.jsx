import React,{useState} from 'react'
import Role from '../common/role'
import { IoCloseSharp } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,email,role,userId,
    onClose,callFunc,
}) => {
    const [userRole,setUserRole]=useState('');

    const handleChange = (e)=>{
        setUserRole(e.target.value);
        console.log(e.target.value,'ll')
    }

    const updateUserRole= async()=>{

            const fetchResponse= await fetch(SummaryApi.updateUser.url,{
                method:SummaryApi.updateUser.method,
                credentials:'include',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    role:userRole,
                    userId:userId
                })
            })
            console.log(userRole,'mummy')
            console.log(fetchResponse,"fetch")
            const responseData= await fetchResponse.json();

            if(responseData.success){
                 toast.success(responseData.message);
                 onClose()
                 callFunc()
            }
            console.log('repsonseData',responseData);
    }
  return (
    <div className='fixed  top-0 down-0 left-0 right-0 w-full h-full z-10  flex justify-between items-center'>
        <div className='mx-auto bg-white shadow-md p-4 max-w-sm'>
            <button className='block ml-auto' onClick={onClose}>
            <IoCloseSharp />
            </button>
            <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
            <p>Name:  {name}</p>
            <p>Email: {email}</p>
             <div className='flex items-center justify-between my-4'>
                <p>Role:</p>
             <select className='border px-4 py-1' value={userRole} onChange={handleChange}>
              {
                 Object.values(Role).map(el=>{
                    return (
                        <option value={el} key={el}>{el}</option>
                    )
                 })
              }
            </select>
                </div>
            <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
        </div>
        </div>
  )
}

export default ChangeUserRole