import express from 'express';
import {
    fetchChaps,fetchOneChap
} from "../controllers/chapController.js";
const router=express.Router();
router.get('/',fetchChaps);
router.get('/:id',fetchOneChap);
export default router;