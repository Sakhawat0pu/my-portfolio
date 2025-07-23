import express from "express";
import { uploadImage, uploadMiddleware, uploadMultipleImages } from "../controllers/upload";
import auth, { isAdmin } from "../middleware/auth";

const router = express.Router();

router.post("/", auth, isAdmin, uploadMiddleware, uploadImage);
router.post("/multiple/:postId", auth, isAdmin, uploadMiddleware, uploadMultipleImages);

export default router;
