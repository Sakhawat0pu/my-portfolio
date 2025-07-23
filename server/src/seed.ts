import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/user";

dotenv.config();

const seedAdmin = async () => {
	try {
		await mongoose.connect(
			process.env.MONGO_URI || "mongodb://localhost:27017/resume",
			{}
		);

		const existingAdmin = await User.findOne({
			email: process.env.ADMIN_EMAIL,
		});
		if (existingAdmin) {
			console.log("Admin user already exists");
			return;
		}

		const hashedPassword = await bcrypt.hash(
			process.env.ADMIN_PASSWORD as string,
			12
		);

		await User.create({
			firstName: process.env.ADMIN_FIRST_NAME,
			lastName: process.env.ADMIN_LAST_NAME,
			email: process.env.ADMIN_EMAIL,
			role: process.env.ADMIN_ROLE,
			password: hashedPassword,
		});

		console.log("Admin user created successfully");
	} catch (error) {
		console.error("Error seeding admin user:", error);
	} finally {
		mongoose.disconnect();
	}
};

seedAdmin();
