import express from "express";
import { getProducts,createProducts,updateProduct,deleteProduct } from "../Controllers/product.controller.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/createProducts", createProducts);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
