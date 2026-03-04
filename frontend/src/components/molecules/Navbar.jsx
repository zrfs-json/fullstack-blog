import React from 'react'
import { Link } from 'react-router-dom'
import { Edit } from 'lucide-react'

function Navbar() {

  return (
      <div className="flex justify-between sticky top-0 z-100 py-5 px-25 bg-slate-800 h-15">
        <Link to={`/articles`} className="flex items-center text-xl font-bold text-white cursor-pointer">NARA SAIF</Link>
        <div className="flex gap-5 items-center text-white">
          <Link to={'/editor'}>
            <p className="flex gap-2 items-center text-base hover:text-slate-50 cursor-pointer">
              <Edit size={20} strokeWidth={2} />
              Write
            </p>
          </Link>
          <Link to={'/articles#blog'}>
            <p className="text-base hover:text-slate-50 cursor-pointer">Article</p>
          </Link>
          <Link to={'/dashboard'}>
            <p className="text-base hover:text-slate-50 cursor-pointer">Users</p>
          </Link>
        </div>
      </div>
  )
}

export default Navbar
