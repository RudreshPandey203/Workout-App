require('dotenv').config()

const mongoose = require('mongoose')

const express = require('express')
const wourkoutRoutes = require('./routes/workouts')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
}
)
//routes
app.use('/api/workouts',wourkoutRoutes)

//connect to mongodb
mongoose.connect(process.env.MONG_URI)
    .then(()=>{
        //listen to server
        app.listen(process.env.Port, ()=>{
        console.log("Connected to db and listening on port", process.env.Port);
    })
    })
    .catch(()=>{
    console.log(error)
    })



process.env