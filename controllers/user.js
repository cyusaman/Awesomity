const User= require('../models/user')
const bcrypt= require('bcryptjs')

/**
 * 
 * @param {Object} req - firstName,
            lastName,
            userName,
            email,
            password
 * @param {JSON} res - message -create user information
 */

 
exports.registerUser= async (req, res, next) =>{
    try {
        const{
            firstName,
            lastName,
            userName,
            email,
            password
        }= req.body

        const user= await User.create({
            firstName,
            lastName,
            userName,
            email,
            password,
        })
        res
           .status(200)
           .json({
               message:'process of creating user done',
               user
           })
    } catch (err) {
        console.log(err)
    }
}

/**
 * 
 * @param {Object} req - userName - password
 * @param {JSON} res - token
 */

exports.loginUser= async (req, res, next)=>{
    try {
        const{userName, password}= req.body
        if (!userName && !password) {
            return res.status(400).json({
                message: 'plz add userName and passwod',
            })
        }
        const user= await User.findOne({userName}).select('+password')
        if (!user) {
            return res.status(400).json({
                message:'this user not Exist'
            })
        }
        const match= await user.matchpass(password)
        if (!match) {
            return res
               .status(400)
               .json({
                   message:'invalid credential'
               }) 
        }
        const token = user.webtoken()
        res
           .status(200)
           .json({
               userName,
               message: 'login done',
               token: token
           })
    } catch (err) {
        console.log(err)
    }
}