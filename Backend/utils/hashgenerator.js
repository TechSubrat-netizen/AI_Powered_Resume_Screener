import dotenv from'dotenv'
dotenv.config()
import bcrypt from'bcrypt';
export const hashGenerator=(password)=>{
    try {
         const saltRounds = parseInt(process.env.SALT_ROUND);
       const hashedKey=  bcrypt.hash(password,saltRounds);
       return hashedKey
    } catch (error) {
         console.error(error);
    }
}

  export const verifyPassword=(password,hashedpassword)=>{
    
       const matchedPassword=bcrypt.compare(password,hashedpassword)
       return matchedPassword
 }


