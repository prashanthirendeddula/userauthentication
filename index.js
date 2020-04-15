const express=require('express')
const dbsetup=require('./config/database')
const {usersRouter}=require('./app/controllers/usersController')
const {messagesRouter} = require('./app/controllers/messagesController')

const app=express()
//connect to db
dbsetup()
app.use(express.json())
app.use('/users',usersRouter)
app.use('/messages', messagesRouter)

const port=3000
app.listen(port,()=>{
    console.log('listeninig on port',port)
})