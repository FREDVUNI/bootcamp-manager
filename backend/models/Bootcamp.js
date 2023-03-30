import mongoose from "mongoose";

const BootcampSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"The bootcamp name is required."],
        unique:true
    },
    rating:{
        type:Number,
        required:[true,"The bootcamp name is required."],
    },
    description:{
        type:String,
        required:[true,"The bootcamp description is required."],
    },
    price:{
        type:Number,
        required:[true,"The bootcamp price is required."],
    }
},{timestamps:true}) 

const Bootcamp = mongoose.model("bootcamps",BootcampSchema)
export default Bootcamp;