import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Reader", "Author", "Admin", "Super Admin"], default: "Reader" },
  resetPasswordToken: { type: String }, // Stores the hashed reset token
  resetPasswordExpires: { type: Date }, // Stores expiration time for token
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;


// export default mongoose.model("User", UserSchema);