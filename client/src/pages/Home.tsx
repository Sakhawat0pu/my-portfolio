import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import About from "./About"; // Import the About component
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";

const Home: React.FC = () => {
	const sentence =
		"Hey, I'm Sakhawat — a CS engineer building in the cloud, with AI on my mind.".split(
			""
		);

	const variants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.03, delayChildren: 0.5 },
		},
	};

	const letterVariants: Variants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: "spring", damping: 12, stiffness: 200 },
		},
	};

	return (
		<>
			{/* Hero Section */}
			<section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-purple-800 to-pink-800 text-white overflow-hidden">
				{/* Subtle background overlay/pattern */}
				<motion.div
					className="absolute inset-0 z-0"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 2, ease: "easeOut" }}
					style={{
						background:
							"radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)",
						filter: "blur(80px)",
						transformOrigin: "center center",
					}}
				></motion.div>

				<div className="container text-center z-10 p-4">
					<motion.h1
						className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl"
						variants={variants}
						initial="hidden"
						animate="visible"
					>
						{sentence.map((char, index) => (
							<motion.span key={index} variants={letterVariants}>
								{char}
							</motion.span>
						))}
					</motion.h1>
					<motion.p
						className="text-xl md:text-2xl mb-10 font-medium opacity-90 drop-shadow-lg"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 2.5, duration: 0.8 }}
					>
						Cloud Engineering | Data Science | DevOps | Software Development |
						AI/ML
					</motion.p>
					<motion.div
						className="space-x-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 2.8, duration: 0.8 }}
					>
						<a
							href="/Sakhawat_Hossain.pdf"
							download="Sakhawat_Hossain_Resume.pdf"
							className="btn btn-lg btn-accent shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
						>
							Download Resume
						</a>
						<Link
							to="/contact"
							className="btn btn-lg btn-outline btn-accent shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
						>
							Contact Me
						</Link>
					</motion.div>
				</div>
			</section>

			{/* About Me Section */}
			<About />

			{/* Experience Section */}
			<Experience />

			{/* Education Section */}
			<Education />

			{/* Skills Section */}
			<Skills />
		</>
	);
};

export default Home;
