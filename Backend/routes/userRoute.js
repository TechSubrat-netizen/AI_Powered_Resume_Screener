import express from'express';
import { userRegistration,loginUser} from '../controller/userController.js';
const user=express.Router();
//registration route
user.post('/register',userRegistration)
//Login route
user.post('/login',loginUser)







export default user;