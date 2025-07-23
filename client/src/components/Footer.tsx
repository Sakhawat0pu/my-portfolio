import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
	return (
		<footer className="w-full p-6 bg-neutral text-neutral-content mt-16 shadow-lg flex flex-col items-center justify-center text-center">
			<aside className="mb-4">
				<p className="font-extrabold text-3xl mb-2">My Portfolio</p>
				<p className="text-base opacity-90 mb-2">
					Crafting innovative solutions since 2023
				</p>
				<p className="text-sm opacity-70">
					Copyright © {new Date().getFullYear()} - All rights reserved
				</p>
			</aside>

			{/* This space is intentionally left empty as per user request */}
			<div className="mb-4" style={{ height: "50px" }}></div>

			<nav>
				<h6 className="font-bold text-xl mb-2">Connect With Me</h6>
				<div className="flex justify-center gap-6">
					<a
						href="https://github.com/yourusername"
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-ghost btn-circle text-3xl hover:text-primary transition-colors duration-200"
					>
						<FaGithub />
					</a>
					<a
						href="https://linkedin.com/in/yourprofile"
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-ghost btn-circle text-3xl hover:text-primary transition-colors duration-200"
					>
						<FaLinkedin />
					</a>
					<a
						href="https://twitter.com/yourusername"
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-ghost btn-circle text-3xl hover:text-primary transition-colors duration-200"
					>
						<FaTwitter />
					</a>
				</div>
			</nav>
		</footer>
	);
};

export default Footer;
