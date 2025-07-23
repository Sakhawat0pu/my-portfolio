import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../services/api";
import type { Project } from "../types";

const Projects: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const { data } = await getProjects();
				setProjects(data);
			} catch (error) {
				console.error("Error fetching projects:", error);
			}
		};
		fetchProjects();
	}, []);

	const handleCardClick = (id: string) => {
		navigate(`/projects/${id}`);
	};

	return (
		<section className="container py-16">
			<h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{projects.map((project, index) => (
					<motion.div
						key={project._id}
						className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 p-6 rounded-lg h-full cursor-pointer"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						onClick={() => handleCardClick(project._id)}
					>
						<div className="card-body">
							<h2 className="card-title text-xl font-bold">{project.name}</h2>
							<p className="text-sm text-base-content opacity-80">
								{project.description.substring(0, 100)}...
							</p>
							<div className="flex flex-wrap gap-2 mt-4">
								{project.languages
									.filter((lang) => lang.toLowerCase() !== "n/a")
									.map((lang, i) => (
										<div
											key={i}
											className="badge badge-primary badge-outline"
										>
											{lang}
										</div>
									))}
								{project.frameworks
									.filter((framework) => framework.toLowerCase() !== "n/a")
									.map((framework, i) => (
										<div
											key={i}
											className="badge badge-secondary badge-outline"
										>
											{framework}
										</div>
									))}
								{project.toolsUsed
									.filter((tool) => tool.toLowerCase() !== "n/a")
									.map((tool, i) => (
										<div key={i} className="badge badge-accent badge-outline">
											{tool}
										</div>
									))}
							</div>
							<div className="card-actions justify-end mt-4">
								{project.frontendRepo.toLowerCase() === "n/a" ? (
									""
								) : (
									<a
										href={project.frontendRepo}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-ghost btn-circle hover:bg-gray-700"
										onClick={(e) => e.stopPropagation()}
									>
										<FaGithub size={24} />
									</a>
								)}
								{project.backendRepo?.toLowerCase() === "n/a" ? (
									""
								) : (
									<a
										href={project.backendRepo}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-ghost btn-circle hover:bg-gray-700"
										onClick={(e) => e.stopPropagation()}
									>
										<FaGithub size={24} />
									</a>
								)}
								{project.liveLink.toLowerCase() === "n/a" ? (
									""
								) : (
									<a
										href={project.liveLink}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-ghost btn-circle ml-2 hover:bg-gray-700"
										onClick={(e) => e.stopPropagation()}
									>
										<FaExternalLinkAlt size={24} />
									</a>
								)}
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default Projects;
