import dotenv from 'dotenv';
dotenv.config()
import mongoose from'mongoose';
 const datbaseConnection= async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database is connected");  
    } catch (error) {
         console.error(error)
    }
 }
  export default datbaseConnection