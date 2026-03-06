import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeClosed } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Register = (/*{setIsLoggin, isLoggin}*/) => {
  
  const {register, handleSubmit, reset, formState: { errors }} = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try{
      // console.log(data)
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data
      )
      setMessage(response.data.message)
      // console.log(response.data)
      if (response.status == 201) {
      // setIsLoggin(!isLoggin)
      navigate("/dashboard")
    }
    }catch(error){
      if(error.response) {
        setMessage(error.response.data.message)
      }else{
        setMessage("Terjadi kesalahan (error)")
      }
    }

    reset()
  }

  return (
    <div className="w-full h-screen flex flex-col m-0 justify-center items-center bg-slate-900">
      <div className="w-xl bg-white rounded-xl p-8 flex flex-col justify-center items-stretch">
      <form 
        className='flex flex-col gap-3'
        onSubmit={handleSubmit(onSubmit)}
        >

        <input 
          type="text" 
          className='border border-slate-400 rounded p-2'
          placeholder='Username'
          {...register("name", {
            required: "Username Wajib Isi!!",
          })}
          />
          
        <input 
          type="text" 
          className='border border-slate-400 rounded p-2'
          placeholder='Email'
          {...register("email", {
            required: "Email wajib isi",
            pattern:{
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Format email tidak valid"
            }
          })}
          />

        <input 
          type="text" 
          className='border border-slate-400 rounded p-2 h-25'
          placeholder='Biography'
          {...register("biography", {
            required: "Biography wajib isi"
          })}
          />

        <div className="relative flex items-center">
          <input
          type={showPassword ? 'text' : 'password'} 
          className='border border-slate-400 rounded p-2 w-full' 
          placeholder='Password'
          {...register("password", {
            required:"Password wajib isi",
            minLength:{
              value:6,
              message:"Minimal 6 karakter"
            }
          })}
          />

          <button 
          type='button' 
          className='flex gap-3 absolute right-4 cursor-pointer' 
          onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye className= "stroke-slate-400"/> : <EyeClosed className= "stroke-slate-400"/>}
          </button>
        </div>
        <div className="relative flex items-center">
          <input
          type={showPassword ? 'text' : 'password'} 
          className='border border-slate-400 rounded p-2 w-full' 
          placeholder='ٌRe-Password'
          {...register("repassword", {
            required:"isi ulang password!",
            minLength:{
              value:6,
              message:"Minimal 6 karakter"
            }
          })}
          />  
        </div>

        <div className="flex justify-center w-full">
          <button type='submit' className="py-2 px-10 rounded bg-blue-600 text-white font-bold hover:bg-blue-400">
            Register
          </button>
        </div>
        <Link to='/' className="flex justify-center text-xs hover:text-blue-400">
          Login
        </Link>
      </form>
          <p className="text-sm">{message}</p>
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          {errors.repassword && <p className="text-sm text-red-600">{errors.repassword.message}</p>}
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>
    </div>
  )
}

export default Register