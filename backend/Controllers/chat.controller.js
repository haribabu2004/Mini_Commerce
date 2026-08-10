import { GoogleGenAI } from "@google/genai";
import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";

export const handlechat = asyncHandler(async (req, res) => {
  const { userMessage } = req.body;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  if (!userMessage) {
    res.status(400);
    throw new Error("User message is required");
  }

  // 1. Clean user message and create safe regex pattern
  const cleanKeywords = userMessage
    .replace(/[^\w\s]/gi, "") // Remove special characters like ?, !, @
    .trim()
    .split(/\s+/) // Split by spaces
    .filter((word) => word.length > 2) // Ignore short words like "is", "in", "or"
    .join("|");

  let relevantProducts = [];

  if (cleanKeywords) {
    const searchRegex = new RegExp(cleanKeywords, "i");
    // Search by name (and category if you have it in schema)
    relevantProducts = await Product.find(
      { name: searchRegex },
      "name price image -_id",
    ).limit(10);
  }

  // 2. Fallback: If search finds nothing or question is general, fetch top 10 items
  if (relevantProducts.length === 0) {
    relevantProducts = await Product.find({}, "name price image -_id").limit(
      10,
    );
  }

  //   const products = await Product.find({}, "name price image");

  const productCatalogContext = JSON.stringify(relevantProducts);

  const systemPrompt = `
      You are an AI Sales Assistant for an E-Commerce Store called "Product Store".
      Here is the current live product inventory from our database:
      ${productCatalogContext}

      Instructions:
      - Help customers find products, compare prices, and give recommendations strictly based on the store inventory above.
      - Keep responses concise, friendly, and helpful.
      - If a requested product is not in the inventory, politely inform the customer.
    `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: [
      {
        role: "user",
        parts: [{ text: `${systemPrompt}\n\nCustomer Query: ${userMessage}` }],
      },
    ],
  });

  if (response) {
    res.status(200).json({
      success: true,
      reply: response.text,
    });
  } else {
    res.status(500);
    //   .json({ messagge: "AI Assistant Unavailable at the movement" });
    throw new Error("AI Assistant Unavailable at the movement");
  }
});
