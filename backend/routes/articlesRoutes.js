const express = require('express')
const router = express.Router()

const {
  getArticles,
  getArticleById,
  createNewArticle,
  editArticle,
  deleteArticle
} = require('../controller/articleController')

router.get('/', getArticles)
router.post('/', createNewArticle)
router.get('/:id', getArticleById)
router.put('/:id', editArticle)
router.delete('/:id', deleteArticle)

module.exports = router