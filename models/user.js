const mongoose= require('mongoose')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')

const userSchema= new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    userName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        select:false
    }
})

userSchema.pre('save', async function(next){
    try {
        const salt= await bcrypt.genSalt(12)
        this.password= await  bcrypt.hash(this.password, salt)
    } catch (err) {
        console.log(err)
    }
})


userSchema.method({
    webtoken: function() {
        return jwt.sign({id: this._id}, process.env.SECRET,{expiresIn: process.env.TADE})
    },
    matchpass: async function (pasw) {
    return await bcrypt.compare(pasw, this.password)
}
})

module.exports= mongoose.model('User', userSchema)