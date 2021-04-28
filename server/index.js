require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
require('./db/conn')
const Question = require('./db/model')
const questRoutes = require('./routes/question')
const userRoutes = require("./routes/users.js")

//middlewares
const app = express()


app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

//routes:
app.use('/question',questRoutes)
app.use('/user',userRoutes)

app.listen(5000,()=>{
    console.log("listening")
})
