const Item= require('../models/todo')

/**
 * 
 * @param {object} req - contain researchKeyword
 * @param {JSON} res - todos
 */

exports.searchItem= async (req, res, next) =>{
    try {
        const keyword= req.params.keyword
        
        const items= await Item.find({
             $or: [
                {"title": {$regex: keyword, $options : 'i'}},
                {"derscription": {$regex: keyword, $options : 'i'}},
            ]
        })
        res
        .status(200)
        .json({
            // message:"proccess of searching done",
            data: items
        })
    } catch (err) {
        console.log(err.message)
    }
}