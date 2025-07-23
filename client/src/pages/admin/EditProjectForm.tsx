import React, { useState, useEffect } from "react";
import { updateProject } from "../../services/api";
import type { Project } from "../../types";

interface EditProjectFormProps {
	project: Project;
	onProjectUpdated: () => void;
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({
	project,
	onProjectUpdated,
}) => {
	const [formData, setFormData] = useState<Project>(project);

	useEffect(() => {
		setFormData(project);
	}, [project]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value.split(",").map((item) => item.trim()),
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await updateProject(formData._id, formData);
			onProjectUpdated();
		} catch (error) {
			console.error("Error updating project:", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-8 p-8 bg-base-200 rounded-2xl shadow-2xl max-w-4xl mx-auto"
		>
			<div className="text-center">
				<h2 className="text-3xl font-bold text-primary">Edit Project</h2>
				<p className="text-base-content/70 mt-2">
					Update the details for the "{formData.name}" project.
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

			<div className="flex justify-end pt-4">
				<button type="submit" className="btn btn-primary">
					Update Project
				</button>
			</div>
		</form>
	);
};

export default EditProjectForm;