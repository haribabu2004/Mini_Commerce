# 🛒 Mini Commerce with Gemini AI

A full-stack E-Commerce application built with the **MERN** stack, **Chakra UI v3**, **Zustand**, and **Google Gemini AI**.

---

## ✨ Features

* **Product Catalog:** View products with styled responsive grids and dynamic currency formatting.
* **CRUD Operations:** Add, edit, and delete products with state sync via Zustand.
* **Server-Side Search & Pagination:** Search inventory dynamically with page limits and skip controls.
* **Gemini AI Sales Assistant:** Real-time AI chat drawer capable of querying MongoDB inventory.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Chakra UI v3, Zustand
* **Backend Runtime:** Node.js & Express.js
* **Database:** MongoDB & Mongoose
* **AI Integration:** Google Gemini AI API

---

## 📁 Project Structure

```text
Mini_Commerce/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # API route handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express endpoints
│   └── server.js        # Server entry point
└── frontend/
    └── src/
        ├── components/  # Reusable UI & Drawer
        ├── pages/       # Views
        └── store/       # Zustand state management
```

## 🚀 Local Setup
1. Prerequisites
Make sure you have installed:

* Node.js (v18+)

* MongoDB

* Gemini API Key

2. Backend Setup
Navigate to the backend directory and install dependencies:

```
cd backend
npm install
```

Create a .env file inside the backend directory:
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Run the server:
```
npm run dev
```

3. Frontend Setup
Navigate to the frontend directory and install dependencies:

```
cd ../frontend
npm install
```

Strat the Vite development server:
```
npm run dev
```
Navigate to http://localhost:5173 in your web browser.


## 🔌 API Specification
Products Endpoint

```
GET /api/products?page=1&limit=6&search=keyword
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

Chatbot Endpoint
```
POST /chat/message
```
