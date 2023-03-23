import mongoose from "mongoose";

const connectDB = async() =>{
    try{
        mongoose.set('strictQuery',false)
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log(`connected to database.`)
    }
    catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

export default connectDB