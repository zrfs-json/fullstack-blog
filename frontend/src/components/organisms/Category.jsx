import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Category = () => {

  const { id } = useParams();//Cek apakah ada ID atau tidak
  const isEditmode = Boolean(id);
  const {register, handleSubmit, reset} = useForm()
  const [message, setMessage] = useState("")
  const [category, setCategory] = useState(null)
  const navigate = useNavigate()

  //FETCH kalau edit mode
  useEffect(() => {
    if(!isEditmode) return;

    const fetchCategory = async () => {
      try{
        const res = axios.get(`http://localhost:3000/api/categories/${id}`)
        setCategory(res.data);
      }catch(error){
        console.error(error)
      }
    };

    fetchCategory();  
  }, [id, isEditmode])

  //otomatis masukin value
  useEffect(() => {
  if(category){
    reset({
      name: category.name
    })
  }
}, [category, reset])

  const onSubmit = async (data) => {
    try{
      if(isEditmode){
        await axios.put(
          `http://localhost:3000/api/categories/${id}`, 
          data
        );
        navigate("/dashboard")
      } else {
        const response = await axios.post(
        "http://localhost:3000/api/categories",
        data
      )
      setMessage(response.data.message)
      if(response.status == 201){ 
      navigate("/dashboard")
    }
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
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-900">
        <div className="w-xl bg-white rounded-xl p-8 flex flex-col justify-center items-stretch">
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col gap-3"
          >
            <input 
              type="text"
              className='border border-slate-400 rounded p-2' 
              placeholder='new Category'
              {...register("name",{
                require: "Category Wajib di isi",
              })}
              />

              <button type='submit' className="py-2 px-10 rounded bg-blue-600 text-white font-bold hover:bg-blue-400">
                {isEditmode ? "Update Category" : "Add New"}
              </button>
          </form>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </>
  )
}

export default Category