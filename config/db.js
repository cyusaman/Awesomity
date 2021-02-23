const mongoose= require('mongoose')


const connectdb= async () =>{
    try {
        const con = await mongoose.connect(process.env.LDB, {
        useNewUrlParser: true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
        })
        console.log(`am run ${con.connection.host} LDB`)
    } catch (err) {
        console.log(err)
    }

}


module.exports= connectdb
