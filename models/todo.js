const mongoose= require('mongoose')


const todo= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    derscription:{
        type:String
    },
    priority:{
        type:String,
        enum:['LOW', 'MEDIUM', 'HIGH'],
        required: true
    }
},{timestamps: true})

module.exports =  mongoose.model('Item', todo)
