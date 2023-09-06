import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

export const createHash = async(password) => {
  return await bcrypt.hash(password, 10);
};

export const isValidPassword = async(password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

export const generateToken = async(user) => {
  return jwt.sign(
    { user: { ...user, password: undefined } },
    process.env.PRIVATE_KEY,
    {
      expiresIn: '10m'
    }
  );
};

export const decodeToken = (token) => {
  console.log(jwt.decode(token));
  return jwt.decode(token);
};
