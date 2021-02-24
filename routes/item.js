const app= require('express')
const router= app.Router()
const {check, validationResult} = require('express-validator')

const {
  createItemValidation
}= require('../middleware/itemsValidation')
const {
  authMiddleware
  }= require('../middleware/auth')

/**
 * type
 */

const{
    createItem,
    getOneItem,
    getItems,
    updateItem,
    deleteItem
}= require('../controllers/item')

/**
 * @swagger
 * "tags": {
 *   "name": "todos",
 *   "description": "to do list manager",
 *       "components": {
  *        "securitySchemes":{
  *             "BearerAuth": {
  *                "type":"http",
  *                "scheme":"bearer"
  *             }
  *        }
  *     }
 * }
 */

/**
 * @swagger
 * components:
 *     schemas:
 *       Item:
 *           type: object
 *           required:
 *              - title:
 *              - priority:
 *              - derscription:
 *           properties:
 *               _id:
 *                  type: string
 *                  drescription: the auto generated
 *               title:
 *                   type: string
 *                   drescription: the to do title
 *               drescription:
 *                    type: string
 *                    drescription: the drescription of to do
 *               priority:
 *                    type: string
 *                    drescription: grade of to do
 *           expample:
 *                _id: hsaa8789has8
 *                title: owesmity challenge
 *                drescription: owesmity challenge "owesmity ask to do a to do list api"
 *                priority: HIGH
 */


 /**
  * @swagger
  * "/item/create": {
  *   "post": {
  *     "summary": "create todos ",
  *     "operationId": "getPetById",
  *     "tags": [todos],
  *      "security": {
  *      "bearerAuth": {
  *           type: 'apiKey',
  *            name: 'x-auth-token',
  *            scheme: 'bearer',
  *            in: 'header',
  *            value: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzU1NjY1ZTkwYjM4MjA0MjRjOTYyZSIsImlhdCI6MTYxNDEzNjMwMywiZXhwIjoxNjE0MjQ0MzAzfQ.IK8nMCMr-noxInFRl7zCFQizRApLGECMyqRhSN2KGzI",
  *            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzU1NjY1ZTkwYjM4MjA0MjRjOTYyZSIsImlhdCI6MTYxNDEzNjMwMywiZXhwIjoxNjE0MjQ0MzAzfQ.IK8nMCMr-noxInFRl7zCFQizRApLGECMyqRhSN2KGzI",
  *          }
  *      },
  *     "requestBody": {
  *      "required": true,
  *      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzU1NjY1ZTkwYjM4MjA0MjRjOTYyZSIsImlhdCI6MTYxNDEzNjMwMywiZXhwIjoxNjE0MjQ0MzAzfQ.IK8nMCMr-noxInFRl7zCFQizRApLGECMyqRhSN2KGzI",
  *      "content": {
  *      "application/json": {
  *       "schema": {
  *         "type": "object",
  *         "properties": {
  *             "_id": {
  *                 "type": "string",
  *             },
  *             "title": {
  *                 "type": "string",
  *             },
  *            "derscription": {
  *                 "type": "string",
  *             },
  *            "priority": {
  *                 "type": "string",
  *             }
  *          },
  *          "example": {
  *              "_id": "817129hkjh12uyq78",
  *              "title": "my first to do",
  *              "derscription": "make things done",
  *              "priority": "HIGH"
  *          }
  *       }
  *      }
  *      }
  *     },
  *     "responses": {
  *         "200": {
  *            "description": "process of creating to do done",
  *            "content": {
  *                 "application/json": {}
  *            }
  *         }
  *      }
  *   }
  * }
  * 
  */

router.post('/create', authMiddleware,[check('derscription').notEmpty(),check('priority').notEmpty(),check('title').notEmpty()],createItemValidation, createItem)


/**
  * @swagger
  * "/item/getItem/{id}": {
  *   "get": {
  *     "summary": "get the to do by id",
  *     "tags":[todos],
  *     "parameters": [{
  *       "in": "path",
  *       "name": "id",
  *         "schema": {
  *           "type": "string"
  *          },
  *         "required": true,
  *         "description": "the todo id"
  *      }],
  *     "responses": {
  *       "200": {
  *          "description": "the todo details",
  *          "content": {
  *            "application/json": {}
  *          }
  *        }
  *      }
  *    }
  * } 
  */
router.get('/getItem/:id', getOneItem)

 /**
  * @swagger
  * /item/getItems:
  *   get:
  *     summary: returns all to do list
  *     tags: [todos]
  *     responses:
  *        200:
  *          description: the list of todos
  *          content:
  *          application/json:
  *            schema:
  *              type: array
  *              item:
  * 
  */
router.get('/getItems', getItems)




 /**
  * @swagger
  * "/item/updateItem/{id}": {
  *    "put": {
  *       "summary": "update todo",
  *       "tags": [todos],
  *      "security": {
  *      "bearerAuth": {
  *           type: 'apiKey',
  *            name: 'x-auth-token',
  *            scheme: 'bearer',
  *            in: 'header',
  *            value: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzU1NjY1ZTkwYjM4MjA0MjRjOTYyZSIsImlhdCI6MTYxNDEzNjMwMywiZXhwIjoxNjE0MjQ0MzAzfQ.IK8nMCMr-noxInFRl7zCFQizRApLGECMyqRhSN2KGzI",
  *            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzU1NjY1ZTkwYjM4MjA0MjRjOTYyZSIsImlhdCI6MTYxNDEzNjMwMywiZXhwIjoxNjE0MjQ0MzAzfQ.IK8nMCMr-noxInFRl7zCFQizRApLGECMyqRhSN2KGzI",
  *          }
  *      },
  *       "parameters": [{
  *          "in": "path",
  *          "name": "id",
  *          "required": true,
  *          "schema": {
  *              "type": "string"
  *          },
  *          "description": "todo id"
  *       }],
  *       "requestBody": {
  *          "required": true,
  *          "content": {
  *              "application/json": {
  *                 "schema":{
  *                    "type": "object",
  *                    "properties": {
  *                        "title": {
  *                            "type": "string",
  *                         },
  *                         "description": {
  *                            "type": "string",
  *                         },
  *                         "priority": {
  *                            "type": "string",
  *                         }
  *                    },
  *                    "example": {
  *                        "_id": "817129hkjh12uyq78",
  *                         "title": "my first to do",
  *                          "derscription": "make things done",
  *                          "priority": "HIGH"
  *                    }
  *                  }
  *              }
  *           }
  *       },
  *       "responses": {
  *           "200": {
  *             "description": "process of updating done",
  *             "content": {
  *                "application/json": {}
  *             }
  *           },
  *            "500": {
  *           },
  *            "404": {
  *           }
  *       }
  *    }
  * }
  */

router.put('/updateItem/:id',authMiddleware, updateItem)


 /**
  * @swagger
  * "/deleteItem/{id}": {
  *    "delete": {
  *       "summary": "delete todo",
  *       "tags": [todos],
  *      "security": {
  *      "bearerAuth": {
  *           type: 'apiKey',
  *            name: 'x-auth-token',
  *            scheme: 'bearer',
  *            in: 'header',
  *            value: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzU1NjY1ZTkwYjM4MjA0MjRjOTYyZSIsImlhdCI6MTYxNDEzNjMwMywiZXhwIjoxNjE0MjQ0MzAzfQ.IK8nMCMr-noxInFRl7zCFQizRApLGECMyqRhSN2KGzI",
  *            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMzU1NjY1ZTkwYjM4MjA0MjRjOTYyZSIsImlhdCI6MTYxNDEzNjMwMywiZXhwIjoxNjE0MjQ0MzAzfQ.IK8nMCMr-noxInFRl7zCFQizRApLGECMyqRhSN2KGzI",
  *          }
  *      },
  *       "parameters": [{
  *           "in": "path",
  *           "name": "id",
  *            "schema": {
  *                "type": "string"
  *            },
  *           "required": true,
  *            "description": "id to do"
  *       }],
  *       "responses":{
  *          "200":{
  *             "description": "the process of deleting todo done",
  *             "content": {
  *                "application/json": {}
  *             }
  *            }
  *       }
  *    }
  * }
  *   
  */

router.delete('/deleteItem/:id', authMiddleware,  deleteItem)


module.exports= router
