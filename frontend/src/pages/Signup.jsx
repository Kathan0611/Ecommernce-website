import  { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import imageTobase64 from '../helpers/imageTobase64'
import SummaryApi from '../common/index'
import { toast } from 'react-toastify'

const Signup = () => {
  const[showPassword,setPassword]=useState(false);
  const[showConfirmPassword,setConfirmPassword]=useState(false)

    const [data,setData]=useState({
      name:"",
      email:"",
      password:"",
      confirmPassword:"",
      ProfilePic:""
    })
    const navigate=useNavigate();

    const handleOnChange= (e)=>{
      const {name,value}=e.target
      
      setData((preve)=>{
        
        return {
            ...preve,
            [name]:value
      }
      })
    }

    const handleSubmit=async (e)=> {
      e.preventDefault()
     if(data.password===data.confirmPassword)
      {
        console.log(SummaryApi.Signup.url,"console jo")
        const dataResponse= await fetch(SummaryApi.Signup.url,{
          method:SummaryApi.Signup.method,
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(data)
        })
         const dataApi = await dataResponse.json();
         console.log("data",dataApi)

         if(dataApi.message){
            toast.success(dataApi.message)
            navigate('/login')
         }
        
         if(data.error){
          toast.error(dataApi.error)
         }
      }
       else {
           toast.error('check Passwords are same??')
       }
      
    }

   const handleUploadFile=async(e)=>{
        const file=e.target.files[0];
        const imagePic= await imageTobase64(file)
        console.log(imagePic)
        
        setData((preve)=>{
          return {
            ...preve,
            ProfilePic: imagePic

          }
        })
   }
  return (
      <section id='login'>
      <div className='bg-gray-100 mx-auto container p-4'>
        <div className='bg-white p2 w-full max-w-md mx-auto border'>
            <div className='w-20 h-20 mx-auto text-8xl relative '>
               <div>
                <img src={data.ProfilePic} alt='icons'/>
                </div>
             <form>
              <label>
              <div className='text-xs bg-opacity-80 bg-slate-200 cursor-pointer pb-4-pt-1 text-center absolute bottom-2 -right-2 w-full'>
                Upload Photo
             </div>
              <input type='file' className='hidden' onChange={handleUploadFile}/>
              </label>
             </form>
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
                    <label>Name :</label>
                    <div className='bg-slate-100 p-2 flex mx-1'>
                    <input  type="name" placeholder='enter Name'
                     name="name"
                     value={data.name}
                     onChange={handleOnChange} 
                     required
                     className='w-full h-full outline-none bg-transparent'/>
                    </div>
                </div>
                <div className='grid'>
                    <label>Email :</label>
                    <div className='bg-slate-100 p-2 flex mx-1'>
                    <input  type="email" placeholder='enter email'
                     name="email"
                     value={data.email}
                     onChange={handleOnChange} 
                     required
                     className='w-full h-full outline-none bg-transparent'/>
                    </div>
                </div>
                <div>
                    <label>Password :</label>
                    <div className='bg-slate-100 p-2 flex mx-1'>
                    <input  type={showPassword? "text":"password"}
                     placeholder='enter password'  
                     value={data.password}
                     name='password'
                     onChange={handleOnChange}
                     required
                     className='w-full h-full outline-none bg-transparent'/>
                    <div className='cursor-pointer' onClick={()=>setPassword((preve)=>!preve)}>
                      <span>
                        {
                            showPassword?(
                                 <FaEyeSlash/>
                             ):
                             (
                                  <FaEye/>
                             )
                        }
                      </span>
                    </div>
                    </div>
                </div>
                <div>
                    <label>Confirm Password :</label>
                    <div className='bg-slate-100 p-2 flex mx-1'>
                    <input  type={showConfirmPassword? "text":"password"}
                     placeholder='enter confirm password'  
                     value={data.confirmPassword}
                     name='confirmPassword'
                     onChange={handleOnChange}
                     required
                     className='w-full h-full outline-none bg-transparent'/>
                    <div className='cursor-pointer' onClick={()=>setConfirmPassword((preve)=>!preve)}>
                      <span>
                        {
                            showConfirmPassword?(
                                 <FaEyeSlash/>
                             ):
                             (
                                  <FaEye/>
                             )
                        }
                      </span>
                    </div>
                    </div>
                  </div>
                <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Signup</button>
            </form>
                 <p className='mx-4'>Do you have already Account ?<Link to={"/login"} className='tex-red-600 hover:text-red-700 hover:underline'>Sign in</Link></p>
        </div>
 
      </div>
        </section>
  )
}

export default Signup