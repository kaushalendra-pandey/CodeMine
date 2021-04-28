const express = require("express")
const mongoose = require("mongoose")
const Question = require("../db/model")


const router = express.Router();

 const getAllQues = async (req, res) => { 
    try {
        const postMessages = await Question.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

 const getQues = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Question.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

 const createQues = async (req, res) => {
    const { title, source, link, solved, category } = req.body;

    const newPostMessage = new Question({ title, source, link, solved, category })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

 const updateQues = async (req, res) => {
    const { id } = req.params;
    const { title, source, link, solved, category } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Question with id: ${id}`);

    const updatedPost = { title, source, link, solved, category, _id: id };

    await Question.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

 const deleteQues = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Question.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}



module.exports = {getAllQues,getQues,createQues,deleteQues,updateQues}