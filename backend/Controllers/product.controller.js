import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const search = req.query.search || "";

    // dynamic search filter
    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(searchQuery);

    const products = await Product.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const totalPages = Math.ceil(totalProducts/limit);

    res.status(200).json({ 
      success: true, 
      data: products, 
      pagination:{
        currentPage: page,
        limit,
        totalProducts, 
        totalPages, 
        hasNextPage : page < totalPages,
        hasPrevPage: page > 1,
      }
    });
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
