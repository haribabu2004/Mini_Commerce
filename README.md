🛒 Mini Commerce with Gemini AI Sales Assistant
A full-stack E-Commerce application built with the MERN stack (MongoDB, Express, React, Node.js), powered by Chakra UI v3, Zustand state management, and an integrated Gemini AI Sales Assistant that can search and recommend inventory in real time.

✨ Features

  🛍️ Product Catalog: View products with styled responsive grids and dynamic local currency formatting.

  ➕ CRUD Operations: Create, update, and delete products seamlessly with modal dialogs and store state sync.

  🔍 Real-Time Search: Search inventory dynamically by product name.

  📄 Server-Side Pagination: Efficient MongoDB .skip() and .limit() query pagination.

  🤖 Gemini AI Sales Assistant: A floating, slide-out drawer chatbot powered by Google's Gemini AI that searches the database and assists users with inventory inquiries.

  🎨 Modern UI & Dark Mode: Built using Chakra UI v3 with full light/dark mode support and animated micro-interactions.

🛠️ Tech Stack

Frontend
  Framework: React + Vite

  UI Library: Chakra UI v3 & React Icons

  State Management: Zustand

  Routing: React Router DOM

Backend
  Runtime: Node.js & Express.js

  Database: MongoDB & Mongoose

  AI Integration: Google Gemini AI API (@google/genai)

📂 Project Structure
Plaintext
Mini_Commerce/
├── backend/
│   ├── config/          # MongoDB Database Connection
│   ├── controllers/     # Product & Chat Logic
│   ├── models/          # Mongoose Schemas (Product Model)
│   ├── routes/          # Express Routes (/api/products, /chat)
│   └── server.js        # Main Express Server Entry Point
│
└── frontend/
    ├── src/
    │   ├── components/  # ProductCard, Pagination, ChatBotDrawer, UI Snippets
    │   ├── pages/       # HomePage, CreatePage
    │   ├── store/       # Zustand State Store (product.js)
    │   ├── App.jsx      # App Routing
    │   └── main.jsx     # ChakraProvider Setup
    └── vite.config.js   # API Proxy Settings
🚀 Getting Started
1. Prerequisites
Ensure you have the following installed on your system:

Node.js (v18+ recommended)

MongoDB (Local or MongoDB Atlas)

Gemini API Key

2. Backend Setup
Navigate to the backend directory:

Bash
cd backend
Install backend dependencies:

Bash
npm install
Create a .env file in the backend/ root directory and add:

Code snippet
PORT=5001
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
Start the backend development server:

Bash
npm run dev
3. Frontend Setup
Navigate to the frontend directory:

Bash
cd ../frontend
Install frontend dependencies:

Bash
npm install
Start the Vite React development server:

Bash
npm run dev
Open your browser at http://localhost:5173.

🔌 API Endpoints Summary
Products Routes (/api/products)
GET /api/products?page=1&limit=6&search=keyword — Fetch paginated products with search filter.

POST /api/products — Add a new product.

PUT /api/products/:id — Update an existing product by ID.

DELETE /api/products/:id — Delete a product by ID.

AI Assistant Route (/chat)
POST /chat/message — Send user query to the Gemini AI Sales Assistant and retrieve intelligent inventory recommendations.

📜 License
This project is open-source and available under the MIT License.
