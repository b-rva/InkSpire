import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    tags: [{ type: String }], // Array of tags
    category: { type: String, required: true }, // Blog category (e.g., Tech, Health, Lifestyle)
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    images: [{ type: String }], // Array of image URLs
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Commented by
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      }
    ],
    votes: {
      upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who upvoted
      downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who downvoted
    },
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who saved the blog
  },
  { timestamps: true } // Auto-creates createdAt & updatedAt fields
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
