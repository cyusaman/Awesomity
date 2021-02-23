const jwt= require('jsonwebtoken')
const {check, validationResult} = require('express-validator')


exports.authMiddleware= ( req, res, next)=>{
    const authHeader= req.headers['authorization']
    const token= authHeader && authHeader.split(' ')[1]
    if (token === null) return res.status(401).json({ message: 'login before this action'})
    jwt.verify(token, process.env.SECRET, (err, user) =>{
        if (err) return res.status(403).json({message: 'token is invalid'})
        req.user= user
        next()
    })
}

exports.registervalidation= (req, res, next)=>{
    const errors= validationResult(req)
    if (!errors.isEmpty()) {
        // console.log(errors)
        res
           .status(400)
           .json({
               message:'you need to fulfill all correctly'
           })
    }else{
        next()
    }
}
