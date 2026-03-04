import React, { useEffect, useState, useRef } from 'react'
import { HandHeart, Edit } from 'lucide-react';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const topRef = useRef(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try { 
        const response = await axios.get(
          `http://localhost:3000/api/articles/${id}`
        )
        setArticle(response.data)
        console.log(article)
      }catch(error){
        console.error(error)
      }
    }
    fetchArticle()
  },[article, id])

  useEffect(()=> {
    topRef.current?.scrollIntoView();//autoScroll ke atas
  },[id])

  if (!article) return <p>Tulisan tidak ditemukan</p>

  return (
    <div ref={topRef} id='blog'>
      <div className="flex flex-col mx-25 py-20 gap-10 px-25 h-screen">
        <div className='flex flex-col gap-2'>
          <div className="flex flex-col gap-6">
            <p className='text-3xl font-bold text-slate-50'>{article.title}</p>
            <p className='text-lg font-normal text-slate-200'>{article.subtitle}</p>
          </div>
          
          <div className="flex gap-3 text-sm items-center font-medium text-slate-400">
            <p>{article.date}</p>
            <p>•</p>
            <div className="flex gap-1 items-center">
              <p>{article.like}</p>
              <HandHeart className=" stroke-slate-400 size-5" />
            </div>
            <p>•</p>
            <Link to={`/editor/${article.id}`}>
              <Edit strokeWidth={2} className='size-4'/>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="h-px w-full bg-slate-200"></div>
        </div>
        <div className='space-y-4 text-slate-50 wrap-break-word overflow-hidden' //Biar supaya textnya ngikutin Width 
        dangerouslySetInnerHTML={{__html: article.content}}></div>
      </div>
    </div>
  )
}

export default Article