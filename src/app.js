import express from "express";
//import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { body } from "express-validator";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

import cartRouter from "./routes/cartsRoutes.js";
import productRouter from "./routes/productsRoutes.js";
import sessionRouter from "./routes/sessionRoutes.js";
import userRouter from "./routes/userRoutes.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";

dotenv.config();

const app = express();
//const viewsPath = path.resolve("./views");
//const publicPath = path.resolve("./public");

//app.use(express.static(publicPath));
app.use(express.urlencoded({ etended: true }));
app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_DB_URI,
      ttl: 10,
    }),
    secret: "CoderS3cR3tC0d3",
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport();
app.use("/api/sessions", sessionRouter);
app.use("/api/users", userRouter);
app.use(passport.session());

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

  //Products

  app.get("/api/products", productRouter);
  app.get("/api/products/:id", productRouter);
  app.post(
    "/api/products",
    body(
      "title",
      "description",
      "price",
      "thumbnail",
      "code",
      "stat"
    ).notEmpty(),
    productRouter
  );
  app.put(
    "/api/products",
    body(
      "id",
      "title",
      "description",
      "price",
      "thumbnail",
      "code",
      "stat"
    ).notEmpty(),
    productRouter
  );
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
