import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageProjects from "./admin/ManageProjects";
import ManagePosts from "./admin/ManagePosts";
import ProjectForm from "./admin/ProjectForm";
import AlertModal from "../components/AlertModal";

import { useAuth } from "../hooks/useAuth";
import {
	createPost,
	createProject,
	deletePost,
	getBlogPosts,
	updatePost,
	updateProject,
	uploadImage,
} from "../services/api";
import type { Project, Post } from "../types";

interface PostFormProps {
	post: Post | null;
	onSave: (post: Post, coverImageFile?: File | null) => void;
	onCancel: () => void;
}

const AdminDashboard: React.FC = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	const [posts, setPosts] = useState<Post[]>([]);
	const [currentPost, setCurrentPost] = useState<Post | null>(null);
	const [currentProject, setCurrentProject] = useState<Project | null>(null);
	const [activeTab, setActiveTab] = useState("manage-posts"); // 'manage-posts', 'create-post', 'manage-projects', 'create-project'
	const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(
		null
	);

	const fetchPosts = useCallback(async () => {
		try {
			const { data } = await getBlogPosts(
				user?.result.role === "admin" ? undefined : user?.result._id
			);
			setPosts(data);
		} catch (error) {
			console.error("Error fetching blog posts:", error);
			setAlert({ message: "Error fetching posts.", type: "error" });
		}
	}, [user]);

	useEffect(() => {
		if (!user) {
			navigate("/login"); // Redirect to login if not authenticated
			return;
		}
		fetchPosts();
	}, [user, navigate, fetchPosts]);

	// Conditional rendering for non-admin users
	if (!user) {
		return (
			<div className="container py-8 text-center">
				<h1 className="text-2xl font-bold">Access Denied</h1>
				<p>You do not have permission to view this page.</p>
			</div>
		);
	}

	const handleEditPost = (post: Post) => {
		setCurrentPost(post);
		setActiveTab("create-post");
		setCurrentProject(null); // Reset project state when switching to post tab
	};

	const handleDeletePost = async (id: string) => {
		try {
			await deletePost(id);
			fetchPosts();
			setAlert({ message: "Post deleted successfully!", type: "success" });
		} catch (error) {
			console.error("Error deleting post:", error);
			setAlert({ message: "Error deleting post.", type: "error" });
		}
	};

	const handleSavePost = async (post: Post, coverImageFile?: File | null) => {
		const { coverImage, ...postData } = post;

		try {
			let savedPost;
			if (currentPost) {
				savedPost = await updatePost(currentPost._id, postData);
				setAlert({ message: "Post updated successfully!", type: "success" });
			} else {
        const { _id, ...newPostData } = postData;
				savedPost = await createPost(newPostData);
				setAlert({ message: "Post created successfully!", type: "success" });
			}

			if (coverImageFile) {
				const uploadFormData = new FormData();
				uploadFormData.append("image", coverImageFile);
				await uploadImage(savedPost.data._id, uploadFormData);
			}

			fetchPosts();
			setCurrentPost(null);
			setActiveTab("manage-posts");
			setCurrentProject(null); // Reset project state when saving a post
		} catch (error) {
			console.error("Error saving post:", error);
			setAlert({ message: "Error saving post.", type: "error" });
		}
	};

	const handleEditProject = (project: Project) => {
		setCurrentProject(project);
		setActiveTab("create-project");
		setCurrentPost(null); // Reset post state when switching to project tab
	};

	const handleCancelEdit = () => {
		setCurrentProject(null);
		setCurrentPost(null);
		setActiveTab(
			activeTab.includes("project") ? "manage-projects" : "manage-posts"
		);
	};

	const handleSaveProject = async (project: Project) => {
		try {
			if (currentProject) {
				await updateProject(currentProject._id, project);
				setAlert({ message: "Project updated successfully!", type: "success" });
			} else {
				await createProject(project);
				setAlert({ message: "Project created successfully!", type: "success" });
			}
			setCurrentProject(null);
			setActiveTab("manage-projects");
			setCurrentPost(null); // Reset post state when saving a project
		} catch (error) {
			console.error("Error saving project:", error);
			setAlert({ message: "Error saving project.", type: "error" });
		}
	};

	return (
		<div className="min-h-screen bg-base-100 text-base-content">
			{alert && (
				<AlertModal
					message={alert.message}
					type={alert.type}
					onClose={() => setAlert(null)}
				/>
			)}
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-lg">
				<div
					role="tablist"
					className="tabs tabs-boxed mb-8 bg-base-300 p-2 rounded-4xl shadow-xl w-fit mx-auto"
				>
					<a
						role="tab"
						className={`tab text-lg font-semibold transition-all duration-500 ${
							activeTab === "manage-posts"
								? "tab-active bg-primary text-primary-content shadow-lg rounded-4xl"
								: "hover:bg-base-200 rounded-4xl"
						}`}
						onClick={() => {
							setActiveTab("manage-posts");
							setCurrentProject(null);
							setCurrentPost(null);
						}}
					>
						Manage Posts
					</a>
					<a
						role="tab"
						className={`tab text-lg font-semibold transition-all duration-500 ${
							activeTab === "create-post"
								? "tab-active bg-primary text-primary-content shadow-lg rounded-4xl"
								: "hover:bg-base-200 rounded-4xl"
						}`}
						onClick={() => {
							setActiveTab("create-post");
							setCurrentPost(null);
							setCurrentProject(null);
						}}
					>
						Create Blog Post
					</a>
					{user?.result.role === "admin" && (
						<>
							<a
								role="tab"
								className={`tab text-lg font-semibold transition-all duration-500 ${
									activeTab === "manage-projects"
										? "tab-active bg-primary text-primary-content shadow-lg rounded-4xl"
										: "hover:bg-base-200 rounded-4xl"
								}`}
								onClick={() => {
									setActiveTab("manage-projects");
									setCurrentPost(null);
									setCurrentProject(null);
								}}
							>
								Manage Projects
							</a>
							<a
								role="tab"
								className={`tab text-lg font-semibold transition-all duration-500 ${
									activeTab === "create-project"
										? "tab-active bg-primary text-primary-content shadow-lg rounded-4xl"
										: "hover:bg-base-200 rounded-4xl"
								}`}
								onClick={() => {
									setActiveTab("create-project");
									setCurrentPost(null);
									setCurrentProject(null);
								}}
							>
								Create Project
							</a>
						</>
					)}
				</div>
				<AnimatePresence mode="wait">
					{activeTab === "manage-posts" && (
						<motion.div
							key="manage-posts"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<ManagePosts
								posts={posts}
								onEdit={handleEditPost}
								onDelete={handleDeletePost}
								onCreateNew={() => setActiveTab("create-post")}
							/>
						</motion.div>
					)}

					{activeTab === "create-post" && (
						<motion.div
							key="create-post"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<PostForm
								post={currentPost}
								onSave={handleSavePost}
								onCancel={handleCancelEdit}
							/>
						</motion.div>
					)}

					{user?.result.role === "admin" && activeTab === "manage-projects" && (
						<motion.div
							key="manage-projects"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<ManageProjects
								onEdit={handleEditProject}
								onCreateNew={() => setActiveTab("create-project")}
							/>
						</motion.div>
					)}

					{user?.result.role === "admin" && activeTab === "create-project" && (
						<motion.div
							key="create-project"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<ProjectForm
								project={currentProject} // Pass currentProject here
								onSave={handleSaveProject}
								onCancel={handleCancelEdit}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default AdminDashboard;

const PostForm: React.FC<PostFormProps> = ({ post, onSave, onCancel }) => {
	const [formData, setFormData] = useState<Post>({
		_id: "",
		title: "",
		slug: "",
		content: "",
		tags: [],
		coverImage: "",
		metaTitle: "",
		metaDescription: "",
		ogImage: "",
		status: "draft",
		publishDate: new Date().toISOString().split("T")[0],
	});
	const [coverImageFile, setCoverImageFile] = useState<File | null>(null); // Add coverImageFile state - confirmed

	useEffect(() => {
		if (post) {
			setFormData({
				...post,
				publishDate: post.publishDate
					? new Date(post.publishDate).toISOString().split("T")[0]
					: new Date().toISOString().split("T")[0],
			});
		} else {
			setFormData({
				_id: "",
				title: "",
				slug: "",
				content: "",
				tags: [],
				coverImage: "",
				metaTitle: "",
				metaDescription: "",
				ogImage: "",
				status: "draft",
				publishDate: new Date().toISOString().split("T")[0],
			});
		}
		setCoverImageFile(null); // Clear file input on post change
	}, [post]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData, coverImageFile);
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			tags: e.target.value.split(",").map((tag) => tag.trim()),
		});
	};

	const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setCoverImageFile(e.target.files[0]);
		}
	};

	useEffect(() => {
		if (formData.title && !post) {
			const newSlug = formData.title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-*|-*$/g, "");
			setFormData((prev) => ({ ...prev, slug: newSlug }));
		}
	}, [formData.title, post]);

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-8 p-8 bg-base-200 rounded-2xl shadow-2xl max-w-4xl mx-auto"
		>
			<div className="text-center">
				<h2 className="text-3xl font-bold text-primary">
					{post ? "Edit Post" : "Create a New Post"}
				</h2>
				<p className="text-base-content/70 mt-2">
					Fill out the details below to {post ? "update the" : "add a new"} post.
				</p>
			</div>

			{/* Main Content */}
			<div className="p-6 bg-base-100 rounded-xl">
				<h3 className="text-xl font-semibold mb-4 text-accent">Main Content</h3>
				<div className="space-y-4">
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Title</span>
						</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							className="input input-bordered w-full"
							required
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Slug</span>
						</label>
						<input
							type="text"
							name="slug"
							value={formData.slug}
							onChange={handleChange}
							className="input input-bordered w-full"
							required
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Content</span>
						</label>
						<textarea
							name="content"
							value={formData.content}
							onChange={handleChange}
							rows={10}
							className="textarea textarea-bordered w-full"
							required
						></textarea>
					</div>
				</div>
			</div>

			{/* Metadata */}
			<div className="p-6 bg-base-100 rounded-xl">
				<h3 className="text-xl font-semibold mb-4 text-accent">Metadata</h3>
				<div className="space-y-4">
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">
								Tags (comma-separated)
							</span>
						</label>
						<input
							type="text"
							name="tags"
							value={formData.tags?.join(", ") || ""}
							onChange={handleTagsChange}
							className="input input-bordered w-full"
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Meta Title</span>
						</label>
						<input
							type="text"
							name="metaTitle"
							value={formData.metaTitle}
							onChange={handleChange}
							className="input input-bordered w-full"
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Meta Description</span>
						</label>
						<textarea
							name="metaDescription"
							value={formData.metaDescription}
							onChange={handleChange}
							rows={3}
							className="textarea textarea-bordered w-full"
						></textarea>
					</div>
				</div>
			</div>

			{/* Media and Publishing */}
			<div className="p-6 bg-base-100 rounded-xl">
				<h3 className="text-xl font-semibold mb-4 text-accent">
					Media & Publishing
				</h3>
				<div className="space-y-4">
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Cover Image</span>
						</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleCoverImageUpload}
							className="file-input file-input-bordered w-full"
						/>
						{formData.coverImage && (
							<img
								src={formData.coverImage as string}
								alt="Cover"
								className="mt-2 w-32 h-32 object-cover rounded"
							/>
						)}
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">
								Open Graph Image (URL)
							</span>
						</label>
						<input
							type="text"
							name="ogImage"
							value={formData.ogImage}
							onChange={handleChange}
							className="input input-bordered w-full"
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Status</span>
						</label>
						<select
							name="status"
							value={formData.status}
							onChange={handleChange}
							className="select select-bordered w-full"
						>
							<option value="draft">Draft</option>
							<option value="published">Published</option>
						</select>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Publish Date</span>
						</label>
						<input
							type="date"
							name="publishDate"
							value={formData.publishDate}
							onChange={handleChange}
							className="input input-bordered w-full"
						/>
					</div>
				</div>
			</div>

			<div className="flex justify-end space-x-4 pt-4">
				<button type="button" onClick={onCancel} className="btn btn-ghost">
					Cancel
				</button>
				<button type="submit" className="btn btn-primary">
					{post ? "Update Post" : "Create Post"}
				</button>
			</div>
		</form>
	);
};

