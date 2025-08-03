import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { getAboutImage, uploadAboutImage } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const About: React.FC = () => {
	const [aboutImage, setAboutImage] = useState<string | undefined>(undefined);
	
	const { user } = useAuth();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const fetchAboutImage = async () => {
		try {
			const { data } = await getAboutImage();
			setAboutImage(data.image);
		} catch (error) {
			console.error("Failed to fetch about image:", error);
			setAboutImage(undefined); // Ensure placeholder is shown if image not found
		}
	};

	useEffect(() => {
		fetchAboutImage();
	}, []);

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			const formData = new FormData();
			formData.append("aboutImage", file);

			try {
				await uploadAboutImage(formData);
				fetchAboutImage(); // Refresh image after successful upload
			} catch (error) {
				console.error("Error uploading image:", error);
			}
		}
	};

	const skills = [
		{ name: "Cloud Engineering", progress: 90, color: "bg-blue-500" },
		{ name: "Data Science", progress: 80, color: "bg-green-500" },
		{ name: "DevOps", progress: 85, color: "bg-purple-500" },
		{ name: "Software Development", progress: 95, color: "bg-red-500" },
		{ name: "AI/ML", progress: 75, color: "bg-yellow-500" },
	];

	return (
		<section className="container py-16">
			<h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
			<div className="flex flex-col md:flex-row items-center gap-12 bg-base-200 p-8 rounded-lg shadow-xl">
				<motion.div
					className={`flex-shrink-0 relative group rounded-full overflow-hidden ${user && user.result.role === "admin" ? "cursor-pointer" : ""}`}
					initial={{ opacity: 0, scale: 0.8 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.8 }}
					onClick={() => user && user.result.role === "admin" && fileInputRef.current?.click()}
				>
					<img
						src={
							aboutImage
								? `data:image/jpeg;base64,${aboutImage}`
								: "/images/placeholder.svg"
						}
						alt="Sakhawat Hossain"
						className="w-64 h-64 object-cover transition-transform duration-300 group-hover:scale-105"
					/>
					{user && user.result.role === "admin" && (
						<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<span className="text-white text-lg font-bold">Click to Change</span>
						</div>
					)}
					<input
						type="file"
						ref={fileInputRef}
						style={{ display: "none" }}
						onChange={handleFileChange}
						accept="image/*"
					/>
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
