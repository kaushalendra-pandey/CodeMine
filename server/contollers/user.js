const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const User = require('../db/user')

const signin = async(req,res) =>{
    const [email,password] = req.body
    try {
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(404).json({message:"User doesn't exist"})
        } else{
            const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
            if(!isPasswordCorrect){
                return res.status(400).json({message:"invalid credentials"})

            }else{
                const token = jwt.sign({email:existingUser.email,id:existingUser._id},`${process.env.SECRET}`,{expiresIn:'1h'})
                res.status(200).json({result:existingUser,token})
            }
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const signup = async(req,res) =>{
    const {email,password,firstName,lastName,confirmPassword} = req.body
    try {
        const existingUser = await Use.findOne({email})
        if(existingUser) return res.status(400).json({message:"User already registered!!! Sign In"})
        
        if (password !== confirmPassword) return res.status(400).json({message:"Password didnt match!!"})
        
        const hashedPassword = await bcrypt.hash(password,12)
        const result = await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})
        const token = jwt.sign({email:result.email,id:result._id},"kaushalendraPandey",{expiresIn:"1h"})
        res.status(200).json({result,token})
    } catch (error) {
        res.send(500).json({message:"Some Error occured!!"})
    }
}

module.exports = {signin,signup}