const chai= require('chai')
const chaiHttp= require('chai-http')
const server= require('../../app.js')
const connectdb= require('../../config/db.js')



chai.should()
chai.use(chaiHttp)


var token= ''
describe('task Ap', () =>{
    /**
     * 
     * get all todos
     * 
     * */
    before( async() =>{
        await connectdb()
        const data= {
            userName:"benjaminCysa",
            password:"password2222"
        }
        chai.request(server)
                .post('/awesomity/authentication/login')
                .send(data)
                .end((err, response) =>{
                    token= response.body.token
                })
    })

    describe('Get /awesomity/item/getItems',() => {
        it('it should get all items', (done) =>{
            chai.request(server)
                .get('/awesomity/item/getItems')
                .end((err, response) =>{
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    done()
                })
        })
    });

    /**
     * 
     * get todo by id
     * 
     * */

    describe('Get one item /awesomity/item/getItem', () => {
        it('it should get item by id', (done) =>{
            const id= '6030bf2990c5a948ca86dba8'
            chai.request(server)
                .get(`/awesomity/item/getItem/${id}`)
                .end((err, response) =>{
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    done()
                })
        })
    });

    /**
     * 
     * get put todo by id
     * 
     * */
    describe('put item by id /awesomity/item/updateItem/:id', () => {
        it('it should update item by id', (done) =>{

            const id= '6030bf2990c5a948ca86dba8',

            data= {
                title:'hello world',
                priority:'HIGH',
               derscription: 'its ok to make thing simple'
            }
            chai.request(server)
                .put(`/awesomity/item/updateItem/${id}`)
                .set({'Authorization': `Bearer ${token}`})
                .send(data)
                .end((err, response) =>{
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    done()
                })
        })
    });

    /**
     * 
     * delete todo by id
     * 
     * */

    describe('delete item by id /awesomity/item/deleteItem', () => {
        it('it should delete item by id', (done) =>{
            const id= '6030bf2990c5a948ca86dba8'
            chai.request(server)
                .delete(`/awesomity/item/deleteItem/${id}`)
                .set({'Authorization': `Bearer ${token}`})
                .end((err, response) =>{
                    response.should.have.status(200)
                    // response.body.should.be.a('object')
                    done()
                })
        })
    })

    /**
     * 
     * post todo
     * 
     * */

    describe('post item /awesomity/item/create', () => {
        it('it should post item', (done) =>{
            const data={
                title:'hello world',
                priority:'HIGH',
                derscription: 'its ok to make thing simple'    
            }
            chai.request(server)
                .post(`/awesomity/item/create`)
                .send(data)
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, response) =>{
                    response.should.have.status(200)
                    // response.body.should.be.a('object')
                    done()
                })
        })
    }),
    describe('get todos csv /awesomity/export/todoList', () =>{
        it('it should return csv link', (done) =>{
            chai.request(server)
                .get('/awesomity/export/todoList')
                .end((err, response) =>{
                    response.should.have.status(200)
                    // response.body.should.be.a('object')
                    done()
                })
        })
    })
})
