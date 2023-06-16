import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import booking_Router from "./route/booking_record.js"
import usersRouter from "./route/users.js"
import RoomTypeRouter from "./route/room_type.js"
import roomsRouter from "./route/room.js"
import payment from "./route/payment.js"
import customer_record from "./route/customer_record.js"
import cookieParser from "cookie-parser"
import QR from "./route/QR.js"
import  MongoClient  from "mongoose"


const app = express()
dotenv.config()
const connect=async () => {
    try {
        await MongoClient.connect(process.env.MONGO);
        console.log("Connect to mongDB")
    }catch (error){
        throw error;
    }
};

  
MongoClient.connection.on("Disconnected", ()=>{
    console.log("Disconnected")
})
//connection with html
app.set('view engine', 'ejs');
app.use(express.static('public'))
// app.engine('html', exp)
//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())


app.use(QR)
app.use(booking_Router)
app.use(payment)
app.use(usersRouter);
app.use(RoomTypeRouter);
app.use(customer_record);
app.use(roomsRouter);
const PORT = process.env.PORT
app.listen(3000, ()=>{
    connect ()
    console.log(`server running on prot ${PORT}`)
});