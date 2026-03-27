import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPost,
  getPosts,
  deletePost
} from "../controller/postController.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/", protect, upload.single("image"), createPost);
router.get("/", getPosts);
router.delete("/:id", protect, deletePost);

export default router;  