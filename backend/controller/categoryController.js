const db = require('../models')
const { Category } = db

exports.getCategories = async (req, res) => {
  try{
    const category = await Category.findAll();
    res.status(200).json(category);
  } catch (error){
    res.status(500).json({Message:"Category tidak ditemukan"})
    res.status(500).json(error)
  }
}

exports.addCategory = async (req, res) => {
  const { name } = req.body

  if(!name){
    return res.status(400).json({
      Message: "Wajib kamu isi itu!!"
    })
  }

  try{
    const newCategory = await Category.create({
      name
    });
    res.status(201).json({
      message: "Kategori Berhasil ditambahkan",
      data: newCategory
    })
  } catch {
    return res.status(500).json({message: "tidak dapat menambahkan"})
  }
}

exports.deleteCategory = async (req, res) =>{
  try{
    const c = await db.Category.findByPk(req.params.id)
    await c.destroy()
    res.json({message: "Category berhasil dihapus"})
  }catch (error){
    console.error(error);
    res.status(500).json({message: error.message})
  }
}

exports.editCategory = async (req, res) => {
  const { id } = req.params
  const { name } = req.params

  if ( !name ){
    return res.status(400).json({
      Message: "Wajib kamu isi itu!!!"
    })
  }

  try{
    const c = await Category.findByPk(id)

    if(!c){
      return res.status(400).json({
        message: "Categor tidak ditemukan"
      })
    }

    c.name = name
    await c.save()

    res.status(200).json({
      message: "Category behrasil ditambahkan",
      data:c
    })
    
  }catch(error){
    console.error(error);
    res.status(500).json({message: error.message})
  }
}