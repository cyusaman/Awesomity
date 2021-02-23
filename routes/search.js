const app= require('express')
const router= app.Router()

const {
    searchItem
}= require('../controllers/search')
/**
 * @swagger
 * "/search/{keyword}": {
 *     "get": {
 *         summary: "search todos",
 *         "tags": [todos],
 *         parameters: [{
 *           "in": "path",
 *            "name": "keyword",
 *            "schema": {
 *               "type": "string"
 *             },
 *            "required": true,
 *            "description": "search todo"
 *         }],
 *         "responses": {
 *           "200": {
 *              "description": "search result are available now",
 *              "content": {
 *                "application/json": {}
 *               }
 *           }
 *          }
 *      }
 * }
 */

 router
    .route('/:keyword')
    .get(searchItem)




module.exports= router
