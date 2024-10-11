const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = 'mongodb://localhost:27017/myzicon';
console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


const userRoutes = require('./routes/users')
const projectRoutes = require('./routes/projects')
const taskRoutes = require('./routes/tasks')
app.use(express.json())
app.use('/users', userRoutes)
app.use('/projects', projectRoutes)
app.use('/tasks', taskRoutes)




const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})