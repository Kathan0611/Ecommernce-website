
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import {Link, Outlet, useNavigate} from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
   const user=useSelector(state=>state?.user?.user);
   const navigate=useNavigate();

   useEffect(()=>{
      if(user?.role !==ROLE.ADMIN){
        navigate('/')
      }
   },[user])
  return (
    <div className='min-h-[calc(100vh-120px)] lg:flex hidden '>
        <aside className='bg-slate-400 min-h-full  w-full  max-w-60 customShadow'>

          <div className="h-32  flex justify-center items-center flex-col">
          <div className='text-5xl cursor-pointer relative flex justify-center'>
          {
            user && user.ProfilePic ? (
              <img src={user?.ProfilePic} className='w-24 h-20 rounded-full pt-1 pb-1'/>
            ): <FaRegCircleUser />
          }
           
        </div>
          <p className='capitalize text-lg font-semibold'>{user?.name}</p>
          <p>
            {user?.role}
          </p>
        </div>
         <div>
           <nav className='grid p-4'>
            <Link to={'all-users'} className='px-2 py-1 hover:bg-slate-100'>All-User</Link>
            <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All-Product</Link>

           </nav>
         </div>
        </aside>

        <main className='w-full'>
             <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel