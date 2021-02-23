const app= require('express')

const router= app.Router()

const{
    getTodoCsv
}= require('../controllers/itemList')


router
    .route('/todoList')
    .get(getTodoCsv)




module.exports= router