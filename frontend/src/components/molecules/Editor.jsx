import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import { Trash } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from "react-quill-new";
import "../../quill-dark.css"
import "react-quill-new/dist/quill.bubble.css"
import axios from "axios";

const Editor = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const {
      register, 
      handleSubmit,
      control,
      reset,
      formState: { errors }
    } = useForm({
      defaultValues: {
        title: "",
        subtitle: "",
        content: ""
      }
    })

  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const topRef = useRef(null);
  
  //FETCH kalau edit mode
  useEffect(() => {
    if (isEditMode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      axios
        .get(`http://localhost:3000/api/articles/${id}`)
        .then((res) => {
          setArticle(res.data);
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);
  console.log(article)

  useEffect(() => {
    if(article) { 
      reset({
        title: article.title,
        subtitle: article.subtitle,
        content: article.content
      })
    }
  },[article, reset])

  const onSubmit = async (data) => {
    console.log(data);
    try{
        if (isEditMode){
        await axios.put(`http://localhost:3000/api/articles/${id}`, data);
          navigate(`/article/${id}`);
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/articles",
          data
        );
        navigate(`/article/${res.data.id}`)
      }
    }catch(error){
      console.error(error)
    }
  };

  const handleDelete = async (id) => {
    try{
      if(!confirm(`Kamu yakin akan menghapus article ${article.title}?`)){
        return
      }else{
        await axios.delete(`http://localhost:3000/api/articles/${id}`)
        navigate('/articles')
      }
    }catch(error){
      console.error(error)
    }
  }

  useEffect(()=> {
      topRef.current?.scrollIntoView();//autoScroll ke atas
    },[id])
  

  if (loading) return <p className='flex justify-center items-center text-slate-50 text-2xl h-screen'>Mengambil Data...</p>

  return (
    <div className='px-40 pb-30'> 
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center pt-5">
          <h1 className='text-2xl font-bold text-slate-50 py-8'>{isEditMode ? "Edit Article" : "Create Article"}</h1>
          <div className="flex gap-3">
            {isEditMode ? <button 
            className='p-2 rounded-3xl text-red-700 font-bold hover:bg-red-700 hover:text-slate-950'
            onClick={()=>handleDelete(article.id)}
            >
              <Trash />
            </button> : ""}
            <button className='p-1 px-4 rounded-3xl text-slate-100 font-bold hover:bg-green-400 hover:text-slate-950' type='submit'>
              {isEditMode ? "Update" : "Publish"}
            </button>  
          </div>
        </div>
        {/* input menggunakan register useForm */}
        <div className='h-px bg-slate-50 w-full mb-5'></div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <input 
              className='px-4 text-slate-50 font-bold text-4xl h-15 focus:outline-none focus:ring-0'
              placeholder='Title'
              {...register("title",
                {required: "Wajib di isi"}
              )}
            />
            {errors.title && <p>{errors.title.message}</p>}

            <input
              className='px-4 text-lg font-semibold text-slate-50 focus:outline-none focus:ring-0'
              placeholder='Subtitle'
              {...register("subtitle",
                { require: "Wajib di isi"}
              )}
            /> 
          </div>

        {/* ReactQuill menggunakan Controller */}
        <Controller 
          name='content'
          control={control} 
          rules={{
            validate: (value) => {
              const stripped = value.replace(/<[^>]+>/g, "").trim(); //Menghapus semua tag HTML
              return stripped.length > 0 || "Content tidak boleh kosong";
            }
          }}
          render={({ field }) => (
            <ReactQuill 
              theme="bubble"
              value={field.value}
              onChange={field.onChange}
              placeholder='Tell what you think...'
            />
          )}
        />
        {errors.content && <p>{errors.content.message}</p>}

        
        </div>
      </form>
    </div>
  )
}



export default Editor