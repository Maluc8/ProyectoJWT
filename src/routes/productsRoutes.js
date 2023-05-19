import express, { Router } from "express";
import {
  list,
  deleteOne,
  getOne,
  save,
  update,
} from "../controllers/productsController.js";

const productRouter = Router();
productRouter.use(express.json());

productRouter.get("/api/products", list);
productRouter.get("/api/products/:id", getOne);
productRouter.post("/api/products", save);
productRouter.put("/api/products", update);
productRouter.delete("/api/products", deleteOne);
//productRouter.get("/api/realTimeProducts", list);

export default productRouter;
