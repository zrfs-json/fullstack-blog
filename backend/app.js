const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const articlesRoutes =require('./routes/articlesRoutes')
const categoriesRoutes = require('./routes/categoryRoutes')

const app = express()

app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json())

app.use('/api/auth', authRoutes) //semua route di authRoutes akan di awali '/api/auth'
app.use('/api/users', userRoutes)
app.use('/api/articles', articlesRoutes)
app.use('/api/categories', categoriesRoutes)

module.exports = app