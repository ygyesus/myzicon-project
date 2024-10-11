const express = require('express')
const app = express()

const userRoutes = require('./routes/users')
const projectRoutes = require('./routes/projects')

app.use(express.json())
app.use('/users', userRoutes)
app.use('/projects', projectRoutes)




const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})