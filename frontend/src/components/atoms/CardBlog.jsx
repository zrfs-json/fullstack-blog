import React, { useState, useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { HandHeart, BookmarkCheck, Ellipsis, Link as LinkIcon, Edit } from 'lucide-react'

function CardBlog() {
  const [articles, setArticles] = useState([])

  const fetchArticles = useCallback( async () => {
    try{
      const res = await axios.get("http://localhost:3000/api/articles")
      setArticles(res.data)
    }catch(error){
      console.error(error)
    }
  },[])

  // const formatDate = (date) => {
  //   return new Date(date).toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //     year: "numeric"
  //   })
  // }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day:"numeric",
      year:"numeric"
    })
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchArticles()
  },[fetchArticles])

  return (
    <div className="flex flex-col items-center pb-20 ">
    {articles.map((article) => {
      return(
        <div className="flex gap-15 w-3/5 items-center border-b border-slate-50 mb-2 p-10" key={article.id}>
          <div className="flex flex-col w-full justify-between gap-5">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-stone-200">{article.title}</h1>
              <p className="text-lg text-stone-300">{article.subtitle}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center font-light">
                <p className="text-base font-medium text-gray-400">{formatDate(article.date)}</p>
                <p className="text-base font-medium text-gray-400">{article.like}</p>
                <HandHeart className='size-5 stroke-gray-400'/>
              </div>
              <div className="flex text-gray-400 gap-4">
                <Link to={`/article/${article.id}`}>
                  <LinkIcon className='size-5'/>
                </Link>
                <Link to={`/editor/${article.id}`}>
                  <Edit strokeWidth={2} className='size-5'/>
                </Link>
                <Ellipsis strokeWidth={2} className='size-5'/>
              </div>
            </div>
          </div>
          <div className="h-full">
            <img src={article.image} alt="Gambar Article" className="h-full ovject-cover rounded-xl" />
          </div>
        </div>
      )
    })}
    </div>
  )
}

export default CardBlog