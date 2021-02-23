const Item= require('../models/todo')
const fs= require('fs')
const {Parser}= require('json2csv')

/**
 * 
 * @param {JSON} res - message - download link
 */


exports.getTodoCsv= async(req, res, next)=>{
    try {
        const item= await Item.find()
        const fields=['_id','title', 'derscription', 'createdAt', 'updatedAt']
        const opts= {fields}
        const parser = new Parser(opts)
        const data= parser.parse(item)
        fs.writeFile('public/data.csv', data, function(err) {
            console.log(err)
        })
            res.status(200).json({
                message:'creating file done',
                downloadLink:'http://localhost:8080/public/data.csv'
            })
        
    } catch (err) {
        console.log(err.message)
    }
}