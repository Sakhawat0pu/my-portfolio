import React, { useState } from "react";
import type { Post } from "../../types";
import { FaEdit, FaTrash, FaPlus, FaExclamationTriangle } from "react-icons/fa";

interface ManagePostsProps {
	posts: Post[];
	onEdit: (post: Post) => void;
	onDelete: (id: string) => void;
	onCreateNew: () => void;
}

const ManagePosts: React.FC<ManagePostsProps> = ({
	posts,
	onEdit,
	onDelete,
	onCreateNew,
}) => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [postToDelete, setPostToDelete] = useState<string | null>(null);

	const openConfirmationModal = (id: string) => {
		setPostToDelete(id);
		setShowConfirmModal(true);
	};

	const closeConfirmationModal = () => {
		setPostToDelete(null);
		setShowConfirmModal(false);
	};

	const handleDelete = () => {
		if (postToDelete) {
			onDelete(postToDelete);
			closeConfirmationModal();
		}
	};

	return (
		<>
			<div className="container py-10">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-4xl font-bold">Manage Posts</h2>
					<button onClick={onCreateNew} className="btn btn-primary">
						<FaPlus className="mr-2" /> Create New Post
					</button>
				</div>

				{posts.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{posts.map((post) => (
							<div
								key={post._id}
								className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
							>
								<div className="card-body">
									<h3 className="card-title text-2xl mb-2">{post.title}</h3>
									<p className="text-base-content/70">
										Status:{" "}
										<span
											className={`badge ${
												post.status === "published"
													? "badge-success"
													: "badge-warning"
											}`}
										>
											{post.status}
										</span>
									</p>
									<p className="text-base-content/70">
										Published on:{" "}
										{post.publishDate
											? new Date(post.publishDate).toLocaleDateString()
											: "N/A"}
									</p>
									<div className="card-actions justify-end mt-4">
										<button
											onClick={() => onEdit(post)}
											className="btn btn-warning btn-sm"
										>
											<FaEdit />
										</button>
										<button
											onClick={() => openConfirmationModal(post._id)}
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
							No posts found. Get started by creating a new one!
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
								Are you sure you want to delete this post? This action cannot be
								undone.
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

export default ManagePosts;
