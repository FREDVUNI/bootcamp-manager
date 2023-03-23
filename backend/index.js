import express from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import connectDB from "./database/connection.js";
import router from './routes/Bootcamp.js'

const app = express();
dotenv.config({ path:".env" })

app.use(morgan("tiny"))

app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.use("/api/v1/",router)

const PORT = process.env.PORT;
connectDB()

app.listen(PORT,() =>{
    console.log(`server is listening on http://localhost:${PORT}`)
})