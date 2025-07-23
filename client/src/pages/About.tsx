import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { uploadImage, getPublicProfile, updateAboutImage } from "../services/api";

const About: React.FC = () => {
	const { user, login } = useAuth();
	const [aboutImage, setAboutImage] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchPublicProfile = async () => {
			try {
				const { data } = await getPublicProfile();
				setAboutImage(data.aboutImage);
			} catch (error) {
				console.error("Failed to fetch public profile:", error);
			}
		};

		fetchPublicProfile();
	}, []);

	const skills = [
		{ name: "Cloud Engineering", progress: 90, color: "bg-blue-500" },
		{ name: "Data Science", progress: 80, color: "bg-green-500" },
		{ name: "DevOps", progress: 85, color: "bg-purple-500" },
		{ name: "Software Development", progress: 95, color: "bg-red-500" },
		{ name: "AI/ML", progress: 75, color: "bg-yellow-500" },
	];

	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			// Check for HEIC file type
			if (file.name.toLowerCase().endsWith(".heic") || file.type === "image/heic") {
				alert("HEIC image format is not supported. Please upload a JPEG, PNG, or WebP image.");
				return;
			}

			if (user) {
				const formData = new FormData();
				formData.append("image", file);
				try {
					// 1. Upload the image
					const { data: uploadData } = await uploadImage(formData);

					// 2. Update the user profile with the new image path
					const { data: updatedUserResponse } = await updateAboutImage({
						aboutImage: uploadData.filePath,
					});

					// 3. Update the auth context with the updated user data
					login({ ...user, result: updatedUserResponse.result });

					// 4. Update the local state to ensure UI consistency
					setAboutImage(uploadData.filePath);
				} catch (error) {
					console.error("Error uploading image:", error);
					alert("Failed to upload image.");
				}
			}
		}
	};

	return (
		<section className="container py-16">
			<h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
			<div className="flex flex-col md:flex-row items-center gap-12 bg-base-200 p-8 rounded-lg shadow-xl">
				<motion.div
					className="flex-shrink-0 relative group rounded-full overflow-hidden"
					initial={{ opacity: 0, scale: 0.8 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.8 }}
				>
					<img
						src={
							aboutImage
								? `http://localhost:4000${aboutImage}`
								: "/images/placeholder.svg"
						}
						alt="Sakhawat Hossain"
						className="w-64 h-64 object-cover transition-transform duration-300 group-hover:scale-105"
					/>
					{user?.result.role === "admin" && (
						<label
							htmlFor="profile-image-upload"
							className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
						>
							<span className="text-white text-lg">Upload Image</span>
							<input
								id="profile-image-upload"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleImageUpload}
							/>
						</label>
					)}
				</motion.div>
				<div className="flex-grow">
					<motion.p
						className="text-lg leading-relaxed mb-8"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Hello! I'm Sakhawat Hossain, a passionate Computer Science Engineer
						with a knack for building robust and scalable solutions. My journey
						in tech has led me through various exciting domains, including cloud
						engineering, data science, DevOps, software development, and the
						fascinating world of Artificial Intelligence and Machine Learning. I
						thrive on solving complex problems and continuously learning new
						technologies to deliver impactful results. I believe in clean code,
						efficient systems, and user-centric design.
					</motion.p>
					<div className="space-y-4">
						{skills.map((skill, index) => (
							<motion.div
								key={skill.name}
								initial={{ width: 0, opacity: 0 }}
								whileInView={{ width: `${skill.progress}%`, opacity: 1 }}
								viewport={{ once: true, amount: 0.5 }}
								transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
								className={`h-8 rounded-full flex items-center px-4 text-white font-bold ${skill.color}`}
								style={{ width: `${skill.progress}%` }}
							>
								{skill.name} ({skill.progress}%)
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
