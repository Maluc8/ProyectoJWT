import UserManager from "../managers/userManager.js";
import { createHash, generateToken, isValidPassword } from "../utils/index.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("sessioncontroller login body\n", req.body);

  if (!email && !password) {
    throw new Error("Email or password invalid format.");
  }
  const manager = new UserManager();
  const user = await manager.getOneByEmail(email);
  const isHashedPassword = await isValidPassword(password, user.password);

  if (!isHashedPassword) {
    return res.status(401).send({ message: "Login failed, invalid password." });
  }
  const accessToken = await generateToken(user);

  console.log("sessionController login accesToken\n", accessToken);
  res
    .cookie("accessToken", accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: false,
    })
    .send({ message: "Login success!" });
};

export const current = async (req, res) => {
  console.log("sessionController current\n");
  res.status(200).send({ status: "Success", payload: req.user });
};

// export const logout = async (req, res) => {
//   req..destroy((err) => {
//     if (!err) {
//       return res.send({ message: "Logout ok." });
//     }
//     res.status(400).send({ message: "Logout error.", body: err });
//   });
// };

export const signup = async (req, res) => {
  const manager = new UserManager();
  console.log("sessionController signup req.body\n", req.body);
  const dto = {
    ...req.body,
    password: await createHash(req.body.password, 10),
  };

  const user = await manager.create(dto);

  res.status(201).send({ status: "success", user, message: "User created." });
};

// export const forgetPassword = async (req, res) => {
//   const { email, password } = req.body;
//   const manager = new UserManager();

//   const dto = {
//     email,
//     password: await createHash(password, 10),
//   };

//   const user = await manager.forgetPassword(dto);

//   res
//     .status(200)
//     .send({ status: "success", user, message: "User change password" });
// };

// export const fail = async (req, res) => {
//   console.log("Failed strategy");
//   res.status(400).send({ error: "Failed" });
// };
