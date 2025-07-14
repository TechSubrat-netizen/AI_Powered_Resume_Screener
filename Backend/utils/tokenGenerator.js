import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export const tokenGenerator = (data, expireTime = '1h') => {
  const token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: expireTime,
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return null;
  }
};


  