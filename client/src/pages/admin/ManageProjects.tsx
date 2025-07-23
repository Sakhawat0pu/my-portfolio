import React, { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../../services/api";
import type { Project } from "../../types";
import { FaEdit, FaTrash, FaPlus, FaExclamationTriangle } from "react-icons/fa";

interface ManageProjectsProps {
	onEdit: (project: Project) => void;
	onCreateNew: () => void;
}

const ManageProjects: React.FC<ManageProjectsProps> = ({
	onEdit,
	onCreateNew,
}) => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

	const fetchProjects = async () => {
		try {
			const { data } = await getProjects();
			setProjects(data);
		} catch (error) {
			console.error("Error fetching projects:", error);
		}
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	const openConfirmationModal = (id: string) => {
		setProjectToDelete(id);
		setShowConfirmModal(true);
	};

	const closeConfirmationModal = () => {
		setProjectToDelete(null);
		setShowConfirmModal(false);
	};

	const handleDelete = async () => {
		if (projectToDelete) {
			try {
				await deleteProject(projectToDelete);
				fetchProjects();
				closeConfirmationModal();
			} catch (error) {
				console.error("Error deleting project:", error);
			}
		}
	};

	return (
		<>
			<div className="container py-10">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-4xl font-bold">Manage Projects</h2>
					<button onClick={onCreateNew} className="btn btn-primary">
						<FaPlus className="mr-2" /> Create New Project
					</button>
				</div>

				{projects.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map((project) => (
							<div
								key={project._id}
								className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
							>
								<div className="card-body">
									<h3 className="card-title text-2xl mb-2">{project.name}</h3>
									<p className="text-base-content/70 line-clamp-3">
										{project.description}
									</p>
									<div className="card-actions justify-end mt-4">
										<button
											onClick={() => onEdit(project)}
											className="btn btn-warning btn-sm"
										>
											<FaEdit />
										</button>
										<button
											onClick={() => openConfirmationModal(project._id)}
											className="btn btn-error btn-sm"
										>
											<FaTrash />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<p className="text-xl text-base-content/70">
							No projects found. Get started by creating a new one!
						</p>
					</div>
				)}
			</div>

			{/* Confirmation Modal */}
			{showConfirmModal && (
				<div className="modal modal-open">
					<div className="modal-box">
						<div className="text-center">
							<FaExclamationTriangle className="text-error text-5xl mx-auto mb-4" />
							<h3 className="font-bold text-2xl">Confirm Deletion</h3>
							<p className="py-4 text-lg">
								Are you sure you want to delete this project? This action cannot
								be undone.
							</p>
						</div>
						<div className="modal-action justify-center">
							<button onClick={handleDelete} className="btn btn-error">
								Delete
							</button>
							<button onClick={closeConfirmationModal} className="btn btn-ghost">
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ManageProjects;

