import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();
const auth = (req, res, next) => {
  //console.log("Auth req.session\n", req.session);
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Empty authentication header!" });
  }
  //console.log("Auth authHeader\n", authHeader);
  const token = authHeader.split(" ")[1];
  console.log("auth auth token\n", token);
  jwt.verify(token, process.env.PRIVATE_KEY, (error, credentials) => {
    console.log("auth auth error\n", error);
    console.log("auth auth credentials\n", credentials);
    if (error) return res.status(403).send({ error: "Authentication error" });

    req.user = credentials.user;
    next();
  });
};

export default auth;
