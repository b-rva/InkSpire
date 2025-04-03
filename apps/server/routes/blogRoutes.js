import express from "express";
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog, upvoteBlog, downvoteBlog} from "../controllers/blogController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Blog (POST to /createBlog)
router.post("/createBlog", authenticate, authorize(["Author", "Admin"]), createBlog);

// Get all Blogs (GET to /blogs)
router.get("/getBlogs", getBlogs);

// Get Blog by ID (GET to /:id)
router.get("/getBlog/:id", getBlogById);

// Update Blog (PUT to /updateBlog/:id)
router.put("/updateBlog/:id", authenticate, authorize(["Author", "Admin"]), updateBlog);

router.delete("/deleteBlog/:id", authenticate, authorize(["Author", "Admin"]), deleteBlog);

// Upvote Blog (POST to /upvote/:id)
router.post("/:id/upvote", authenticate, upvoteBlog);

// Downvote Blog (POST to /downvote/:id)
router.post("/:id/downvote", authenticate, downvoteBlog);

export default router;
