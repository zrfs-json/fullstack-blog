import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import { Trash } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from "react-quill-new";
import "../../quill-dark.css"
import "react-quill-new/dist/quill.bubble.css"
import axios from "axios";
import Select from "react-select"

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
  const [users, setUsers] = useState([])
  const [category, setCategory] = useState([])
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
    const payload = {
      ...data, //Duplicate data
      userId: data.userId.value, //mengubah userId, menjadi Value/isi yang di inginkan
      categories: data.categories?.map(cat => cat.value) || []
    } //Immutability
    // console.log(payload)
    try{
        if (isEditMode){
        await axios.put(`http://localhost:3000/api/articles/${id}`, payload);
          navigate(`/article/${id}`);
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/articles",
          payload
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

  //get User for Option
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data)
        // console.log(response.data)
      }catch (error){
        console.error(error)
      }
    }
    fetchUsers();
  },[])

  //Data untuk React Select
  const options = users.map(user => ({
    value: user.id,
    label: user.name
  }))
  // console.log(options)

  useEffect(() => {
    const fetchCategories = async () => {
      try{
        const response = await axios.get("http://localhost:3000/api/categories");
        setCategory(response.data)
        // console.log(response.data)
      }catch (error){
        console.error(error)
      }
    }
    fetchCategories();
  },[])
  // console.log(category)
  const categoryOptions = category.map(gory => ({
    value: gory.id,
    label: gory.name
  }))
  
  

  if (loading) return <p className='flex justify-center items-center text-slate-50 text-2xl h-screen'>Mengambil Data...</p>

  return (
    <div className='px-40 pb-30'> 
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center pt-5">
          <h1 className='text-2xl font-bold text-slate-50 py-8'>{isEditMode ? "Edit Article" : "Create Article"}</h1>
          <div className="flex">
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

            {isEditMode ? 
              <p className='px-4 text-slate-50/50 mt-2 text-sm'>Author: {article.author}</p> : 
              <div className="flex">
                <Controller
                  name='userId'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      placeholder="Pilih Author"
                      // onChange={(selected) => field.onChange(selected.defaultValues)} (DIHAPUS, karena membuat datanya ga ke kirim ke backend)
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null
                      }}
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#0f172b",
                          border: "none",
                          boxShadow: "none",
                          fontWeight: 600,
                          paddingLeft: 5,
                        }),

                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#0f172b"
                        }),

                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isFocused ? "#1e293b" : "#0f172b",
                          color: "white",
                          cursor: "pointer",
                          fontWeight: 300,  
                          paddingLeft: 15,
                        }),

                        singleValue: (base) => ({
                          ...base,
                          color: "white"
                        }),

                        placeholder: (base) => ({
                          ...base,
                          color: "#f8fafc8c"
                        })
                      }}
                    />
                  )}
                />
                <Controller
                  name='categories'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={categoryOptions}
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Pilih Category"
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null
                      }}
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#0f172b",
                          border: "none",
                          boxShadow: "none",
                          fontWeight: 600,
                          paddingLeft: 5
                        }),

                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#0f172b"
                        }),

                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isFocused ? "#1e293b" : "#0f172b",
                          color: "white",
                          cursor: "pointer",
                          fontWeight: 300,  
                          paddingLeft: 15
                        }),

                        singleValue: (base) => ({
                          ...base,
                          color: "white"
                        }),

                        placeholder: (base) => ({
                          ...base,
                          color: "#f8fafc8c"
                        })
                      }}
                    />
                  )}
                />
              </div>
            }
            
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