import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'

const UserDetail = () => {
  const { id } = useParams();
  const [users, setUsers] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate()
  console.log("Component render")

  useEffect(() => {
    const fetchUser = async () =>{
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${id}`
        )
        setUsers(response.data)
        console.log(response.data)
      }catch (error){
        console.error(error)
      }
    }
    fetchUser()
  },[id])

  //untuk otomatis masukin value
  useEffect(()=>{
    if (users){
      reset(users)//isi ulang data dengan data yang ada di dalam 'users'
    }
  },[users,reset])

  const onSubmit = async (data) => {
    try{
      console.log("Masuk bang")
      await axios.put(
         `http://localhost:3000/api/users/${id}`,
          data
        )
      alert('Data berhasil diedit')
      navigate('/dashboard')
    } catch(error){
      console.error(error)
    }
  }

  return (
    <div className='flex flex-col gap-3 items-center justify-center text-white h-screen'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-1/2'>
        <input 
          type="text" 
          className='border border-slate-400 rounded p-2'
          placeholder='Username'
          {...register("name", {
            required: "Username Wajib Isi!!",
          })}
          />

        <textarea
          type="text" 
          className='border border-slate-400 rounded p-2'
          placeholder='Biography'
          {...register("biography", {
            required: "Biography wajib isi"
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

        <button type='submit' className='p-2 rounded-xl border-2 font-semibold hover:text-slate-900 hover:bg-white'>Update</button>
      </form>
    </div>
  )
}

export default UserDetail