import express from "express";
import { uploadImage, uploadMiddleware } from "../controllers/upload";
import auth, { isAdmin } from "../middleware/auth";

const router = express.Router();

router.post("/:postId", auth, isAdmin, uploadMiddleware, uploadImage);

export default router;
