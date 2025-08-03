import React, { useEffect, useState } from "react"; // Added a comment to force recompile

import type { Project } from "../../types";

interface ProjectFormProps {
	project: Project | null;
	onSave: (project: Project, coverImageFile?: File | null) => void;
	onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
	project,
	onSave,
	onCancel,
}) => {
	const [formData, setFormData] = useState<Omit<Project, "_id">>(() => {
		if (project) {
			return {
				name: project.name || "",
				description: project.description || "",
				frontendRepo: project.frontendRepo || "",
				backendRepo: project.backendRepo || "",
				liveLink: project.liveLink || "",
				languages: project.languages || [],
				frameworks: project.frameworks || [],
				toolsUsed: project.toolsUsed || [],
				coverImage: project.coverImage || "", // Add coverImage to state
			};
		} else {
			return {
				name: "",
				description: "",
				frontendRepo: "",
				backendRepo: "",
				liveLink: "",
				languages: [],
				frameworks: [],
				toolsUsed: [],
				coverImage: "", // Initialize coverImage
			};
		}
	});
	const [coverImageFile, setCoverImageFile] = useState<File | null>(null); // New state for the file

	useEffect(() => {
		if (project) {
			setFormData({
				name: project.name || "",
				description: project.description || "",
				frontendRepo: project.frontendRepo || "",
				backendRepo: project.backendRepo || "",
				liveLink: project.liveLink || "",
				languages: project.languages || [],
				frameworks: project.frameworks || [],
				toolsUsed: project.toolsUsed || [],
				coverImage: project.coverImage || "", // Set existing coverImage
			});
			setCoverImageFile(null); // Clear file input on project change
		} else {
			setFormData({
				name: "",
				description: "",
				frontendRepo: "",
				backendRepo: "",
				liveLink: "",
				languages: [],
				frameworks: [],
				toolsUsed: [],
				coverImage: "",
			});
			setCoverImageFile(null);
		}
	}, [project]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setCoverImageFile(e.target.files[0]);
		}
	};

	const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value.split(",").map((item) => item.trim()),
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData as Project, coverImageFile);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-8 p-8 bg-base-200 rounded-2xl shadow-2xl max-w-4xl mx-auto"
		>
			<div className="text-center">
				<h2 className="text-3xl font-bold text-primary">
					{project ? "Edit Project" : "Create a New Project"}
				</h2>
				<p className="text-base-content/70 mt-2">
					Fill out the details below to {project ? "update the" : "add a new"}{" "}
					project to your portfolio.
				</p>
			</div>

			{/* Basic Information */}
			<div className="p-6 bg-base-100 rounded-xl">
				<h3 className="text-xl font-semibold mb-4 text-accent">
					Basic Information
				</h3>
				<div className="space-y-4">
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Project Name</span>
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="input input-bordered w-full"
							required
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Cover Image</span>
							<span className="label-text-alt">(Optional)</span>
						</label>
						<input
							type="file"
							name="coverImage"
							onChange={handleFileChange}
							className="file-input file-input-bordered w-full"
							accept="image/*"
						/>
						{formData.coverImage && !coverImageFile && (
							<p className="text-sm text-base-content/70 mt-2">
								Current: <a href={`http://localhost:4000/${formData.coverImage}`} target="_blank" rel="noopener noreferrer" className="link link-primary">{formData.coverImage.split('/').pop()}</a>
							</p>
						)}
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Description</span>
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							rows={4}
							className="textarea textarea-bordered w-full"
							required
						></textarea>
					</div>
				</div>
			</div>

			{/* Links */}
			<div className="p-6 bg-base-100 rounded-xl">
				<h3 className="text-xl font-semibold mb-4 text-accent">Project Links</h3>
				<div className="space-y-4">
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">
								Frontend Repo URL
							</span>
							<span className="label-text-alt">
								(if not available, enter "N/A")
							</span>
						</label>
						<input
							type="text"
							name="frontendRepo"
							value={formData.frontendRepo}
							onChange={handleChange}
							className="input input-bordered w-full"
							required
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">
								Backend Repo URL
							</span>
							<span className="label-text-alt">
								(if not available, enter "N/A")
							</span>
						</label>
						<input
							type="text"
							name="backendRepo"
							value={formData.backendRepo}
							onChange={handleChange}
							className="input input-bordered w-full"
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Live Link</span>
							<span className="label-text-alt">
								(if not available, enter "N/A")
							</span>
						</label>
						<input
							type="text"
							name="liveLink"
							value={formData.liveLink}
							onChange={handleChange}
							className="input input-bordered w-full"
							required
						/>
					</div>
				</div>
			</div>

			{/* Technologies */}
			<div className="p-6 bg-base-100 rounded-xl">
				<h3 className="text-xl font-semibold mb-4 text-accent">
					Technologies Used
				</h3>
				<p className="text-sm text-base-content/70 mb-4">
					Enter comma-separated values for each field.
				</p>
				<div className="space-y-4">
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Languages</span>
						</label>
						<input
							type="text"
							name="languages"
							value={formData.languages.join(", ")}
							onChange={handleArrayChange}
							className="input input-bordered w-full"
							required
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Frameworks</span>
						</label>
						<input
							type="text"
							name="frameworks"
							value={formData.frameworks.join(", ")}
							onChange={handleArrayChange}
							className="input input-bordered w-full"
							required
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Tools</span>
						</label>
						<input
							type="text"
							name="toolsUsed"
							value={formData.toolsUsed.join(", ")}
							onChange={handleArrayChange}
							className="input input-bordered w-full"
							required
						/>
					</div>
				</div>
			</div>

			<div className="flex justify-end space-x-4 pt-4">
				<button type="button" onClick={onCancel} className="btn btn-ghost">
					Cancel
				</button>
				<button type="submit" className="btn btn-primary">
					{project ? "Update Project" : "Create Project"}
				</button>
			</div>
		</form>
	);
};

export default ProjectForm;

