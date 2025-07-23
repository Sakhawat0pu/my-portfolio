import express from "express";
import {
	createPost,
	deletePost,
	getPost,
	getPostBySlug,
	getPosts,
	updatePost,
} from "../controllers/posts";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", getPosts);
router.get("/user/:userId", auth, getPosts);
router.get("/slug/:slug", getPostBySlug);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

export default router;
