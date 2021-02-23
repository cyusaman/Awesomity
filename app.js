const express= require('express')
const morgan = require('morgan')
const cors= require('cors')
const bodyParse= require('body-parser')
const dotenv= require('dotenv')
const app= express()
const apiRoutes= require('./routes/index')
const connectdb= require('./config/db')
const path= require('path')
const fs= require('fs')

const  swaggerJsDocs= require('swagger-jsdoc')
const swaggerUi= require('swagger-ui-express')


dotenv.config({path:'./config/config.env'})

app.use(morgan('common',{
  stream: fs.createWriteStream(path.join(__dirname, 'info.log'), {flags:'a'})
}))

app.use(cors())
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }));
connectdb()


const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'To do api',
        version: '1.0.0',
      },
      servers:[{
        url:"http://localhost:8080/awesomity"
      }]
    },
    apis: ['./routes/*.js'],
  };

const swaggerDocs= swaggerJsDocs(options)

app.use('/swaggerApi',swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/awesomity', apiRoutes)

app.use('/public', express.static(path.join(__dirname,'public')))
// app.use('/jsdoc', express.static(path.join(__dirname, 'docs/index.html')))




const PORT= process.env.PORT


module.exports= app.listen(PORT, console.log(`am on ${PORT} port`))

