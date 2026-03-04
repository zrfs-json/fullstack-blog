const db = require('../models')

exports.getArticles = async (req, res) => {
  try {
    const articles = await db.articles.findAll();
    res.status(200).json(articles);
  } catch (error){
    res.status(500).json({message: "Tidak dapat memuat Article (ERROR🛑)"})
  }
}

exports.getArticleById = async (req, res) => {
  try{
    const id = parseInt(req.params.id)
    
    const article = await db.articles.findByPk(id)

    if(!article){
      return res.status(404).json({
        message: "Article tidak ditemukan!!"
      })
    }

    res.status(200).json(article)
  }catch(error){
    res.status(500).json({
      message: "Kesalahan internal (Server)"
    })
  }
}

exports.createNewArticle = async (req, res) => {
  try{
    const { title, subtitle, content } = req.body;

    //Memastikan tidak ada konten yang dikirim kosong
    if (!title || !subtitle || !content){
      return res.status(400).json({
        message:"Wajib di ISI!!!!"
      })
    }

    //Generate id menggunakan random math
    const randomId = Math.floor(Math.random() * 1000);
    const imageUrl = `https://picsum.photos/id/300/200?random=${randomId}`;


    //insert menggunakan ORM Sequelize
    const newArticle = await db.articles.create({
      title, 
      subtitle,
      content,
      image: imageUrl
    });

    res.status(200).json({
      message: "Article created",
      id: newArticle.id});
  }catch(error){
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

exports.editArticle = async (req,res) => {
  try{
  const { id } = req.params; //parameter ID
  const { title, content, subtitle} = req.body;


  //Mencari id yang akan di edit
  const article = await db.articles.findByPk(id);

  if (!article){
    return res.status(400).json({
      message:"Article tidak ditemukan"
    })
  }

  //Overwrite konten lama dengan baru
  article.title = title;
  article.subtitle = subtitle;
  article.content = content;

  //Save data
  await article.save();

  res.status(200).json({
    message: "User Berhasil ditambahkan",
    data: article
  })
  }catch(error){
    res.status(500).json({
      message: "Server error", 
      error: error.message
    })
  }
}

exports.deleteArticle = async (req,res) => {
  try{
    const article = await db.articles.findByPk(req.params.id)
    await article.destroy()
    res.status(200).json({message: "Article berhasil dihapus"})
  }catch (error){
    console.error(error);
    res.status(500).json({message: error.message})
  }
}