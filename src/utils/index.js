import bcrypt from "bcrypt";

export const createHash = async (password) => {
  return await bcrypt.hash.apply(password, 10);
};

export const isValidPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

export const generateToken = async (user) => {
  return await jwt.sign(
    { user: { ...user, password: undefined } },
    process.env.PRIVATE_KEY,
    { expiresIn: "1m" }
  );
};
