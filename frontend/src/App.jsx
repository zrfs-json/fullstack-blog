import './App.css'
import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './components/organisms/Dashboard.jsx'
import Register from './components/organisms/Register.jsx'
import Auth from './components/organisms/Auth.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import UserDetail from './components/organisms/UserDetail.jsx'
import MainLayout from './Layout/MainLayout.jsx'
import Articles from './components/organisms/Articles.jsx'
import Article from './components/organisms/Article.jsx'
import Editor from './components/molecules/Editor.jsx'
import Category from './components/organisms/Category.jsx'

function CheckAuthStatus({ isLoggin }){
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //Jika belum login dan bukan di login page / register -> paksa ke login
    if(location.pathname == '/register'){
      return navigate('/register')
    }

    if(!isLoggin && (location.pathname !== '/')){
      navigate('/')
    }

    if(isLoggin && location.pathname == '/'){
      navigate('/dashboard');
    }
  })
}

function App() {
  
  const [isLoggin, setIsLoggin] = useState(true)
  return (
   <BrowserRouter>
    {/* <CheckAuthStatus isLoggin={isLoggin}/> */}
    
      <Routes>
        
          <Route path='/' element={<Auth setIsLoggin={setIsLoggin} isLoggin={isLoggin}/>} />
          <Route path='/register' element={<Register setIsLoggin={setIsLoggin} isLoggin={isLoggin} />} />
        
        
        <Route element={<MainLayout/>}>
          <Route path='/dashboard' element={<Dashboard isLoggin={isLoggin} />} />
          <Route path='/user/:id' element={<UserDetail isLoggin={isLoggin} />} />
          <Route path='/articles' element={<Articles />}/>
          <Route path='/article/:id' element={<Article />}/>
          <Route path='/editor/' element={<Editor />}/>
          <Route path='/editor/:id' element={<Editor />}/>
          <Route path='/kategori' element={<Category />}/>
          <Route path='/kategori/:id' element={<Category />}/>
        </Route>
      </Routes>

   </BrowserRouter>
  )
}

export default App
