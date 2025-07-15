import express from'express';
import { userRegistration,loginUser,getUser} from '../controller/userController.js';
const user=express.Router();
//registration route
user.post('/register',userRegistration);
//Login route
user.post('/login',loginUser);
//Get All User
user.get('/getALl',getUser);







export default user;