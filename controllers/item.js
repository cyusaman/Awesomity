const Item= require('../models/todo')


/**
 *  create todo
 * @param {object} req  - title -derscription -priority
 * @param {Json} res - message - title -derscription -priority
 * @property {String} title - required
 * @property {String} priority - required
 * @property {String} derscription - required
 */

 

exports.createItem= async (req, res)=>{
    try {
        const {
            title,
            derscription,
            priority
        }= req.body
        const item= await Item.create({
            title,
            derscription,
            priority,
        })
        res.status(200).json({
            message:'creating item process done',
            item
        })
    } catch (err) {
        console.log(err.message)
    }
}

/**
 *  get  todo by id
 * @param {object} req  -id of todo
 * @param {JSON} res - todo
 */


exports.getOneItem= async (req, res, next)=>{
    try {
        const id = req.params.id

        const item = await Item.findById(id)
        res
        .status(200)
        .json({
            message:'process of getting one item done',
            item
        })
    } catch (err) {
        console.log(err.message)
    }
}

/**
 *  get all todos
 * @param {Json} res - todo
 */


exports.getItems= async (req, res, next)=>{
    try {
        const item = await Item.find()
        res
        .status(200)
        .json({
            // message:'process of get items done',
            item
        })
    } catch (err) {
        console.log(err)
    }
}

/**
 *  update  todo by id
 * @param {Object} req  -body
 * @param {Json} res - todo
 * @property {String} title - if you need to  update it
 * @property {String} priority - if you need to  update it
 * @property {String} derscription - if you need to  update it
 */


exports.updateItem= async (req, res, next)=>{
    try {
        const id = req.params.id
        const updates= req.body
        const options= { new: true }
        const item= await Item.findByIdAndUpdate(id,updates, options)


        res
        .status(200)
        .json({
            message:'updating item process done',
            item
        })
    } catch (err) {
        console.log(err.message)
    }

}

/**
 *  delete  todo by id
 * @param {Object} req  -body
 * @param {Json} res - todo
 */


exports.deleteItem= async (req, res, next)=>{
    try {
        const id = req.params.id
        const item= await Item.findByIdAndDelete({_id:id})
        res
        .status(200)
        .json({
            message:'deleting item process done'
        })
    } catch (err) {
        console.log(err.message)
    }
}