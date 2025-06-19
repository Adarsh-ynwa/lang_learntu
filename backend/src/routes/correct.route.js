import express from "express"
import { correct } from "../controllers/correct.controller.js";

const router=express.Router();
router.post("/",correct);
export default router;