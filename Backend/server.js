import dotenv from'dotenv'
dotenv.config()
import express from 'express';
import user from './routes/userRoute.js';
import datbaseConnection from './config/db.js';
const app=express();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//Routes
app.use('/user',user)

//APIS
app.get('/',(req,res)=>{
    res.send("hello i am from server")
})





//Datbase connection
 datbaseConnection()
//Creating  server
app.listen(parseInt(process.env.PORT||4000),"localhost",(()=>{
    console.log(`server is running on http://localhost:${parseInt(process.env.PORT)}`)
}))







