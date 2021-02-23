const chai= require('chai')
const chaiHttp= require('chai-http')
const server= require('../../app.js')
const connectdb= require('../../config/db.js')
const User= require('../../models/user')


connectdb()

chai.should()
chai.use(chaiHttp)

describe('api on auth', () => {
    const data= {
        firstName:"benjamin",
        lastName: "cyusa",
        userName:"benjaminCysa",
        email:"benjamincyusa@gmail.com",
        password:"password2222"
    }
    const invalidEmail= {
        firstName:"ntwali",
        lastName: "bolo",
        userName:"ntwalibolo",
        email:"ntwalibologmail.com",
        password:"ashask8787as"
    }
    const invaliduserName= {
        userName:"benjaminben",
        password:"password2222"
    }
    const invalidPassword= {
        userName:"benjaminben",
        password:"password2222"
    }
    /**
     * 
     * register
     * 
     * */
    before(async() =>{
        try {
            await User.deleteMany()
        } catch (err) {
            console.log(err.message)
        }
    })
    describe('api of register ', () => {
        it('it should register new user', (done) =>{
            chai.request(server)
                .post('/awesomity/authentication/register')
                .send(data)
                .end((err, response) =>{
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    done()
                })
        })
    })
    /** register user with 
     *  invalidEmail
     */
    describe('api of register  ', () => {
        it('it should register with invalid data', (done) =>{
            chai.request(server)
                .post('/awesomity/authentication/register')
                .send(invalidEmail)
                .end((err, response) =>{
                    response.should.have.status(400)
                    response.body.should.be.a('object')
                    done()
                })
        })
    })

    /**
     * 
     * login
     * 
     * */

    describe('api of login ', () => {
        it('login user', (done) =>{
            chai.request(server)
                .post('/awesomity/authentication/login')
                .send({
                       userName:data.userName,
                       password:data.password
                    })
                .end((err, response) =>{
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    done()
                })
        })
    })
    describe('api of login ', () => {
        it('login with  invalid user name', (done) =>{
            chai.request(server)
                .post('/awesomity/authentication/login')
                .send(invaliduserName)
                .end((err, response) =>{
                    response.should.have.status(400)
                    response.body.should.be.a('object')
                    done()
                })
        })
    })
    describe('api of login ', () => {
        it('login with invalid password', (done) =>{
            chai.request(server)
                .post('/awesomity/authentication/login')
                .send(invalidPassword)
                .end((err, response) =>{
                    response.should.have.status(400)
                    response.body.should.be.a('object')
                    done()
                })
        })
    })
})
