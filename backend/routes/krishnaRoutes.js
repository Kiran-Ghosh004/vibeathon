import express from "express";
import { krishnaResponse } from "../controllers/krishnaController.js";


const router = express.Router();

router.post("/ask", krishnaResponse);

export default router;
