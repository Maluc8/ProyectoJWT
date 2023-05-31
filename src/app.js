import express from "express";
//import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
//import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import cartRouter from "./routes/cartsRoutes.js";
import productRouter from "./routes/productsRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

void (async () => {
  await mongoose
    .connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Conectado a la DB"));

  app.listen(8080, () => {
    console.log("Server is listening on port 8080...");
  });

  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use("/api/sessions", sessionRouter);
  app.use("/api/users", userRouter);

  //Products

  app.get("/api/products", productRouter);
  app.get("/api/products/:id", productRouter);
  app.post("/api/products", productRouter);
  app.put("/api/products", productRouter);
  app.delete("/api/products", productRouter);
  //app.get("/api/realtimeproducts", productRouter);

  //Carts

  app.get(`/api/carts`, cartRouter);
  app.get("/api/carts/:id", cartRouter);
  app.post("/api/carts", cartRouter);
  app.put("/api/carts", cartRouter);
  app.put("/api/carts/:cid/products/:pid", cartRouter);
  app.delete("/api/carts", cartRouter);
  app.delete("/api/carts/:cid/products/:pid", cartRouter);
  app.delete("/api/carts/:cid", cartRouter);
})();
