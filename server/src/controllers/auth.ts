import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

interface CustomRequest extends Request {
	userId?: string;
}

export const register = async (req: CustomRequest, res: Response) => {
	const { firstName, lastName, email, password, role } = req.body;
	const userId = req.userId;

	try {
		const user = await User.findById(userId);

		if (!user || user.role !== "admin") {
			return res
				.status(403)
				.json({ message: "Not authorized to register new users" });
		}

		if (!email || !password || !firstName || !lastName) {
			return res
				.status(400)
				.json({ message: "Please provide all required fields" });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: "Password must be at least 6 characters long" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res
				.status(400)
				.json({ message: "User with that email already exists" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			role: role === "admin" || role === "user" ? role : "user",
		});

		const token = jwt.sign(
			{ email: result.email, id: result._id },
			process.env.JWT_SECRET!,
			{ expiresIn: "1h" }
		);

		res.status(201).json({ result, token });
	} catch (error) {
		console.error("Registration error:", error);
		res
			.status(500)
			.json({
				message: "Something went wrong",
				error: (error as Error).message,
			});
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser)
			return res.status(404).json({ message: "User doesn't exist" });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid credentials" });

		const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET!, {
			expiresIn: "1h",
		});

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Something went wrong", error: (error as Error).message });
	}
};

export const changePassword = async (req: CustomRequest, res: Response) => {
	const { oldPassword, newPassword } = req.body;
	const userId = req.userId; // From auth middleware

	try {
		if (!oldPassword || !newPassword) {
			return res
				.status(400)
				.json({ message: "Please provide old and new passwords" });
		}

		if (newPassword.length < 6) {
			return res
				.status(400)
				.json({ message: "New password must be at least 6 characters long" });
		}

		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid old password" });

		const hashedPassword = await bcrypt.hash(newPassword, 12);
		user.password = hashedPassword;
		await user.save();

		res.status(200).json({ message: "Password changed successfully" });
	} catch {
		res.status(500).json({ message: "Something went wrong" });
	}
};

export const updateProfile = async (req: CustomRequest, res: Response) => {
	const { firstName, lastName, email, phone, website, city, state, country, role } =
		req.body;
	const userId = req.userId; // From auth middleware

	try {
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		user.firstName = firstName ?? user.firstName;
		user.lastName = lastName ?? user.lastName;
		user.email = email ?? user.email;
		user.phone = phone ?? user.phone;
		user.website = website ?? user.website;
		user.city = city ?? user.city;
		user.state = state ?? user.state;
		user.country = country ?? user.country;

		if (user.role === 'admin' && role) {
			user.role = role;
		}

		await user.save();

		res
			.status(200)
			.json({ result: user, message: "Profile updated successfully" });
	} catch (error) {
		console.error("Update profile error:", error);
		res.status(500).json({ message: "Something went wrong", error: (error as Error).message });
	}
};

export const updateProfilePicture = async (req: CustomRequest, res: Response) => {
	const { profilePicture } = req.body;
	const userId = req.userId;

	try {
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		if (user.role !== 'admin') {
			return res.status(403).json({ message: "Not authorized to update profile picture" });
		}

		user.profilePicture = profilePicture;
		await user.save();

		res.status(200).json({ result: user, message: "Profile picture updated successfully" });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};
