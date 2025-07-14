import userModel from "../Model/userModel.js";
import cookie from'cookie-parser';
import {hashGenerator,verifyPassword} from "../utils/hashgenerator.js";
import {tokenGenerator} from "../utils/tokenGenerator.js";

//API'S

//Registration user
export const userRegistration = async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    
    let hashedpassword = await hashGenerator(data.password);

    let user = new userModel({ ...data, password: hashedpassword });
    await user.save();

    let token = tokenGenerator({ id: user._id }, { expiresIn: '1h' });

    
    // Option 1: Set as cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ msg: 'User registration successful', user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error during registration' });
  }
};
//Login user
 export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email)

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }

    // Find user in DB
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "Invalid user" });
    }

    // Compare passwords
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    // Generate JWT token
    const token = tokenGenerator({ id: user._id }, { expiresIn: '1h' });

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true in production if using HTTPS
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send success response
    res.status(200).json({ msg: "Login successful", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error during login" });
  }
};
