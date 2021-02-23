const app= require('express')
const router= app.Router()
const {check} = require('express-validator')
const {
    registervalidation
    }= require('../middleware/auth')

const {
    registerUser,
    loginUser
}= require('../controllers/user')


/**
 * @swagger
 * "/authentication/register": {
 *   "post":{
 *      "tags": [authentication],
 *      "summary": "register new user",
 *      "requestBody": {
 *         "required": true,
 *         "content": {
 *             "application/json": {
 *                  "schema": {
 *                     type: "object",
 *                      properties: {
 *                        "fristName": {
 *                          "type": "string"
 *                        },
 *                         "lastName": {
 *                          "type": "string"
 *                        },
 *                         "userName": {
 *                          "type": "string"
 *                        },
 *                         "email": {
 *                          "type": "string"
 *                        },
 *                         "password": {
 *                          "type": "string"
 *                        },
 *                      },
 *                      "example": {
 *                        "fristName":"ngarambe",
 *                         "lastName":"benjamin",
 *                         "userName":"benjamino",
 *                         "email": "benjamin@gmail.com",
 *                         "password": "last2233ja"
 *                      }
 *                   }
 *              }
 *          }
 *       },
 *       "responses": {
 *           "200": {
 *              "description":"registering user",
 *               "content": {
 *                   "application/json":{}
 *               }
 *           }
 *       }
 *   }
 * }
 */

 
router.post('/register',[check('firstName').notEmpty(),check('lastName').notEmpty(),check('userName').notEmpty(), check('email').isEmail(), check('password').notEmpty()],registervalidation ,registerUser)




/**
 * @swagger
 * "/authentication/login": {
 *   "post":{
 *      "tags": [authentication],
 *      "summary": "login",
 *      "requestBody": {
 *         "required": true,
 *         "content": {
 *             "application/json": {
 *                  "schema": {
 *                     type: "object",
 *                      properties: {
 *                         "userName": {
 *                          "type": "string"
 *                        },
 *                         "password": {
 *                          "type": "string"
 *                        },
 *                      },
 *                      "example": {
 *                         "userName":"benjamino",
 *                         "password": "last2233ja"
 *                      }
 *                   }
 *              }
 *          }
 *       },
 *       "responses": {
 *           "200": {
 *              "description":"login",
 *               "content": {
 *                   "application/json":{}
 *               }
 *           }
 *       }
 *   }
 * }
 */
router
    .route('/login')
    .post(loginUser)


module.exports= router