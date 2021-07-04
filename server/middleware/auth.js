const jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {
    try {
       const token = req?.headers?.authorization.split(" ")[1]
       const isVerfied = jwt.verify(token,process.env.SECRET)
       if (isVerfied){
        console.log("in here")
            next()
       }
       
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Not Authorized."})
    }
}

module.exports = auth