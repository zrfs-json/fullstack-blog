const express = require('express')
const router = express.Router()

const {
  getCategories,
  addCategory,
  deleteCategory,
  editCategory
} = require('../controller/categoryController')

router.get('/', getCategories)
router.post('/', addCategory)
router.delete('/:id', deleteCategory)
router.put('/:id', editCategory)

module.exports = router