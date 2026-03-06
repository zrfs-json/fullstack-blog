import { useNavigate, Link } from "react-router-dom"
import { Edit, Trash2 } from 'lucide-react'
import { useState, useEffect, useCallback } from "react"
import axios from "axios"

const Dashboard = ({isLoggin}) => {
  const navigate = useNavigate()

  if(!isLoggin){
    navigate('/')
  }

  const [users, setUsers] = useState([]);
  const [deleted, setDeleted] = useState("");

  

  const fetchUsers = useCallback( async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data)
      console.log(response.data)
    }catch (error){
      console.error(error)
    }
  },[])
   useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id)=> {
    try{
      const find = users.find(user => user.id === id)
      if(!confirm(`Kamu yakin menghapus akun ${find.name}?`)){
        return
      }else{
        const res = await axios.delete(`http://localhost:3000/api/users/${id}`)
        setDeleted(res.data.message)
        setTimeout(()=>{
          setDeleted(null)
        },1000)
      }
      setUsers(prev => prev.filter(user => user.id !== id))
    }catch (error){
      console.error(error)
    }
  }

  return (
  <> 
    <div className="flex flex-col justify-start items-center border-spacing-2 py-10 px-25 text-slate-50 min-h-screen">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-bold">Daftar Akun</h1>
        <Link to={'/register'}>
          <p className="p-2 bg-blue-600 rounded-sm">+Add User</p>
        </Link>
      </div>
      {deleted && <p className="text-green-400 font-semibold">{deleted}</p>}
      <table className="table-auto w-full border-gray-200">
        <tr>
          <th>name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td className="text-stone-200 w-30">{user.name}</td>
              <td className="text-stone-200">{user.email}</td>
              <td className="text-stone-200">{user.biography}</td>
              <td>
                <div className="flex flex-col items-center gap-5">
                  <button className="bg-red-400 rounded-lg p-2" onClick={()=>handleDelete(user.id)}>
                  <Trash2 className="hover:cursor-pointer hover:stroke-slate-500 size-4"/>
                </button>
                <Link className="bg-green-400 rounded-lg p-2" to={`/user/${user.id}`} >
                  <Edit className="hover:cursor-pointer hover:stroke-slate-500 size-4"/>
                </Link>
              </div>
              </td>
            </tr>
          ))} 

      </table>
    </div>
  </> 
  )
}

export default Dashboard