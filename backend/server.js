import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config({ quiet: true });

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // middleware to access req.body (database)

app.use("/api", productRoutes);

if (process.env.NODE_ENV === "production") {
  // Fixed path.join arguments
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// console.log(process.env.MONGO_URI);

app.listen(PORT, async () => {
  await connectDB();
  console.log("Server running at http://localhost: " + PORT);
});
