const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    source:{
        type:String,
        require:true
    },
    link:{
        type:String,
    },
    solved:{
        type:String,
        require:true
    },
    category:{
        type:String
    }

})

const Question = mongoose.model("Question",questionSchema)

module.exports = Question
