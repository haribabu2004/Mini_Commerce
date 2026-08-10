import express from "express"
import { handlechat } from "../Controllers/chat.controller.js";

const router = express.Router();

router.post("/message",handlechat)

export default router;