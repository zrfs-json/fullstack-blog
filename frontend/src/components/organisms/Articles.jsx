import Heading from '../molecules/Heading.jsx'
import CardBlog from '../atoms/CardBlog.jsx'

const Articles = () => {

  return (
    <>
      <Heading />
      <div className="flex flex-col gap-10" id='blog'>
        <h1 className='px-50 font-bold text-slate-50'>Our Story</h1>
        <div className='h-px bg-slate-50 w-full'></div>
      </div>
      <CardBlog />
    </>
  )
}

export default Articles