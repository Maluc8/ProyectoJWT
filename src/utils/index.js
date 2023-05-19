import bcrypt from "bcrypt";

export const createHash = async (password) => {
  return await bcrypt.hash.apply(password, 10);
};

export const isValidPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};
