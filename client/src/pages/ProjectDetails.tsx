import React, { useEffect, useState } from "react";
import {
	FaCalendarAlt,
	FaCodeBranch,
	FaExternalLinkAlt,
	FaGithub,
	FaTools,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getProject } from "../services/api";
import type { Project } from "../types";

const ProjectDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [project, setProject] = useState<Project | null>(null);

	useEffect(() => {
		const fetchProject = async () => {
			if (id) {
				try {
					const { data } = await getProject(id);
					setProject(data);
				} catch (error) {
					console.error("Error fetching project:", error);
				}
			}
		};
		fetchProject();
	}, [id]);

	if (!project) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container py-8">
			<div className="mb-8">
				<Link to="/projects" className="btn btn-ghost btn-md">
					&larr; Back to Projects
				</Link>
			</div>
			<h1 className="text-5xl font-extrabold mb-4 text-primary">
				{project.name}
			</h1>
			<p className="text-xl text-base-content opacity-80 mb-12">
				{project.description}
			</p>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-base-200 p-8 rounded-lg shadow-xl">
					<h3 className="text-2xl font-bold mb-4 flex items-center">
						<FaCodeBranch className="mr-3 text-primary" /> Repositories:
					</h3>
					<div className="space-y-3">
						{project.frontendRepo &&
							project.frontendRepo.toLowerCase() !== "n/a" && (
								<p className="text-lg">
									<strong>Frontend:</strong>{" "}
									<a
										href={project.frontendRepo}
										target="_blank"
										rel="noopener noreferrer"
										className="link link-hover text-info flex items-center"
									>
										<FaGithub className="mr-2" /> {project.frontendRepo}
									</a>
								</p>
							)}
						{project.backendRepo &&
							project.backendRepo.toLowerCase() !== "n/a" && (
								<p className="text-lg">
									<strong>Backend:</strong>{" "}
									<a
										href={project.backendRepo}
										target="_blank"
										rel="noopener noreferrer"
										className="link link-hover text-info flex items-center"
									>
										<FaGithub className="mr-2" /> {project.backendRepo}
									</a>
								</p>
							)}
					</div>
				</div>

				<div className="bg-base-200 p-8 rounded-lg shadow-xl">
					<h3 className="text-2xl font-bold mb-4 flex items-center">
						<FaExternalLinkAlt className="mr-3 text-primary" /> Live
						Application:
					</h3>
					{project.liveLink && project.liveLink.toLowerCase() !== "n/a" ? (
						<p className="text-lg">
							<a
								href={project.liveLink}
								target="_blank"
								rel="noopener noreferrer"
								className="link link-hover text-info flex items-center"
							>
								<FaExternalLinkAlt className="mr-2" /> {project.liveLink}
							</a>
						</p>
					) : (
						<p className="text-lg">Not available</p>
					)}
				</div>

				<div className="bg-base-200 p-8 rounded-lg shadow-xl lg:col-span-2">
					<h3 className="text-2xl font-bold mb-4 flex items-center">
						<FaTools className="mr-3 text-primary" /> Technologies Used:
					</h3>
					<div className="flex flex-wrap gap-3">
						{project.languages
							.filter((lang) => lang.toLowerCase() !== "n/a")
							.map((lang, i) => (
								<span
									key={i}
									className="badge badge-lg badge-primary p-3 text-base"
								>
									{lang}
								</span>
							))}
						{project.frameworks
							.filter((framework) => framework.toLowerCase() !== "n/a")
							.map((framework, i) => (
								<span
									key={i}
									className="badge badge-lg badge-secondary p-3 text-base"
								>
									{framework}
								</span>
							))}
						{project.toolsUsed
							.filter((tool) => tool.toLowerCase() !== "n/a")
							.map((tool, i) => (
								<span
									key={i}
									className="badge badge-lg badge-accent p-3 text-base"
								>
									{tool}
								</span>
							))}
					</div>
				</div>

				{project.createdAt && (
					<div className="bg-base-200 p-8 rounded-lg shadow-xl lg:col-span-2">
						<h3 className="text-2xl font-bold mb-4 flex items-center">
							<FaCalendarAlt className="mr-3 text-primary" /> Created On:
						</h3>
						<p className="text-lg">
							{new Date(project.createdAt).toLocaleDateString()}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectDetails;
