
const express =require('express');
const app= express();
const tasks = require('./routes/tasks')
const mongoose=require('mongoose')
const connectDB=require('./dp/connect')
require('dotenv').config()
const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')


//middleware
app.use(express.static('./public'))
app.use(express.json()); 


//routes


app.use('/api/v1/tasks', tasks);

app.use(notFound)
app.use(errorHandlerMiddleware)

const port= process.env.PORT || 4000

const start=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true})
        app.listen(port,console.log(`server is listening on port ${port}...`))
    }catch(error){
        console.log(error)
    }
}

start()





