const mongoose =require("mongoose")
const Question = require('./model')

const connectDB = async () => {
    try {
        const data = await mongoose.connect(`${process.env.DB_url}`,{
        useUnifiedTopology:true,
        useNewUrlParser:true},)
        console.log("Connection")

    } catch (error) {
        console.log(error)
    }
}
connectDB()

module.exports = connectDB

