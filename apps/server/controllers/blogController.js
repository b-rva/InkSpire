import Blog from "../models/Blog.js";

// @desc Create a new blog
// @route POST /api/blogs
// @access Private (Only Authors & Admins)
export const createBlog = async (req, res) => {
    try {
        const { title, content, tags, category, images } = req.body;
        const blog = new Blog({
            title,
            content,
            tags,
            category,
            images,
            author: req.user.id, // Assuming authentication middleware sets req.user
        });

        await blog.save();
        res.status(201).json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Get all blogs with search, filter, and pagination
// @route GET /api/blogs?search=keyword&category=tech&page=1&limit=10
// @access Public
export const getBlogs = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 10 } = req.query;

        const query = {};

        // Search by title or content (case insensitive)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
            ];
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Pagination
        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 }) // Newest blogs first
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalBlogs = await Blog.countDocuments(query); // Get total count

        res.json({
            blogs,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: parseInt(page),
            totalBlogs
        });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// @desc Get a single blog
// @route GET /api/blogs/:id
// @access Public
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email");
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Update a blog
// @route PUT /api/blogs/:id
// @access Author (own blog), Admin, Super Admin
export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ msg: "Blog not found" });
        }

        // Check if user is the author or has admin privileges
        if (req.user.role !== "Admin" && req.user.role !== "Super Admin" && blog.author.toString() !== req.user.id) {
            return res.status(403).json({ msg: "You are not authorized to edit this blog" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// @desc Delete a blog
// @route DELETE /api/blogs/:id
// @access Author (own blog), Admin, Super Admin
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ msg: "Blog not found" });
        }

        // Check if user is the author or has admin privileges
        if (req.user.role !== "Admin" && req.user.role !== "Super Admin" && blog.author.toString() !== req.user.id) {
            return res.status(403).json({ msg: "You are not authorized to delete this blog" });
        }

        await blog.deleteOne();
        res.json({ msg: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// @desc Upvote a blog post
// @route POST /api/blogs/:id/upvote
// @access Private
export const upvoteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: "Blog not found" });

        // Check if user already upvoted
        if (blog.votes.upvotes.includes(req.user.id)) {
            return res.status(400).json({ msg: "You already upvoted this blog" });
        }

        // Remove from downvotes if present
        blog.votes.downvotes = blog.votes.downvotes.filter(userId => userId.toString() !== req.user.id);

        // Add user to upvotes
        blog.votes.upvotes.push(req.user.id);

        await blog.save();
        res.json({ msg: "Blog upvoted", upvotes: blog.votes.upvotes.length, downvotes: blog.votes.downvotes.length });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// @desc Downvote a blog post
// @route POST /api/blogs/:id/downvote
// @access Private
export const downvoteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: "Blog not found" });

        // Check if user already downvoted
        if (blog.votes.downvotes.includes(req.user.id)) {
            return res.status(400).json({ msg: "You already downvoted this blog" });
        }

        // Remove from upvotes if present
        blog.votes.upvotes = blog.votes.upvotes.filter(userId => userId.toString() !== req.user.id);

        // Add user to downvotes
        blog.votes.downvotes.push(req.user.id);

        await blog.save();
        res.json({ msg: "Blog downvoted", upvotes: blog.votes.upvotes.length, downvotes: blog.votes.downvotes.length });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
