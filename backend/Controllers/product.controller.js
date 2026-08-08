import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const createProducts = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // const newProduct = new Product(product);

  try {
    const newProduct = await Product.create({
      name: product.name,
      price: product.price,
      image: product.image
    })
    res.status(200).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product Id is Invalid" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.error("Error in deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product Id is Invalid" });
  }

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateProduct });
  } catch (error) {
    console.error("Error in updating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
