const {validationResult} = require('express-validator')

exports.createItemValidation= (req,res,next)=>{
    const errors= validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res
           .status(400)
           .json({
               message:'you need to fulfill all input'
           })
    }
    next()
}
