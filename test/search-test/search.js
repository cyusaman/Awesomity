const chai= require('chai')
const chaiHttp= require('chai-http')
const server= require('../../app.js')
const connectdb= require('../../config/db.js')


connectdb()

chai.should()
chai.use(chaiHttp)

describe('api on search', () => {

    /**
     * 
     * search todo
     * 
     * */

    describe('api for search todo', () => {
        it('it should search todo by keyword', (done) =>{
           const keyword= 'hello world'
            chai.request(server)
                .get(`/awesomity/search/${keyword}`)
                .end((err, response) =>{
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    done()
                })
        })
    })

})
