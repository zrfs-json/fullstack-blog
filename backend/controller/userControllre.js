const db = require('../models')
const { User } = db 

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) { 
    res.status(500).json({message: "Tidak dapat mengambil user (ERROR🛑)"})
    res.status(500).json(error)
  }
}

exports.getUserById = async (req, res) => {
  const id = parseInt(req.params.id)
  try{
    const user = await User.findByPk(id)

    if(!user){
      return res.status(404).json({
        message: "User tidak ditemukan"
      })
    }

    res.status(200).json(user)
  }catch(error){
    res.status(500).json({
      message: "Kesalahan dalam server",
      error
    })
  }
}

exports.updateUser = async  (req, res) => {
  const { id } = req.params
  const { name, email, biography } = req.body

  if (!name || !email || !biography ){
    return res.status(400).json({
      Message: "Wajib kamu isi itu!!!"
    })
  }

  try{
    const user = await User.findByPk(id)

    if(!user){
      return res.status(404).json({
        message:"User tidak ditemukan"
      })
    }

    user.name = name
    user.biography = biography
    user.email = email

    await user.save()

    res.status(200).json({
      message: "User Berhasil ditambahkan",
      data:user
    })
  }catch (error){
    console.error(error)
    res.status(500).json({
      message:"Kesalahan Server"
    })
  }
}

exports.deleteUser = async (req, res) => {
  try{
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.json({message: "Ingatanmu berhasil dihapus!"})
  }catch (error){
    console.error(error);
    res.status(500).json({message: error.message})
  }
} 