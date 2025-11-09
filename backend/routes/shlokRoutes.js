import express from 'express';
import {
    fetchShlok
} from "../controllers/shlokController.js";
const router=express.Router();
router.get("/:ch/:sl",fetchShlok);
export default router;