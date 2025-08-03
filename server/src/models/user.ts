import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	role: { type: String, enum: ["user", "admin"], default: "user" },
	password: { type: String, required: true },
	phone: { type: String },
	website: { type: String },
	city: { type: String },
	state: { type: String },
	country: { type: String },
	profilePicture: { type: String },
	aboutImage: { type: Buffer },
});

const User = mongoose.model("User", userSchema);

export default User;
