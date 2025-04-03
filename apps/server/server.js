import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js"; // Import the routes
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
// app.use(cors({
//   origin: "http://localhost:3000",  // Your frontend URL
//   credentials: true,  // Allow cookies
// }));
app.use(express.json()); // Allows parsing JSON in requests
app.use(cookieParser());

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
// app.use(cookieParser());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
    res.send("Welcome to InkSpire API!");
});

// Start server after DB connection
connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});
