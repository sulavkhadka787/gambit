import express from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/current");

router.put("/update");

export default router;
