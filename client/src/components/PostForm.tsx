import React, { useState, useEffect } from "react";
import { uploadImage } from "../services/api";

interface Post {
	_id: string;
	title: string;
	slug: string;
	content: string;
	author?: string;
	tags?: string[];
	coverImage?: string;
	metaTitle?: string;
	metaDescription?: string;
	ogImage?: string;
	status?: "draft" | "published";
	publishDate?: string;
	createdAt?: string;
}

interface PostFormProps {
	post: Post | null;
	onSave: (post: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSave }) => {
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
	}, [post]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
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

	const handleCoverImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			const uploadFormData = new FormData();
			uploadFormData.append("image", file);
			try {
				const { data } = await uploadImage(uploadFormData);
				const imageUrl = data.filePath;
				setFormData({ ...formData, coverImage: imageUrl });
			} catch (error) {
				console.error("Error uploading cover image:", error);
				const toast = document.createElement("div");
				toast.className = "toast toast-top toast-center";
				toast.innerHTML =
					'<div class="alert alert-error"><span>Error uploading cover image.</span></div>';
				document.body.appendChild(toast);
				setTimeout(() => toast.remove(), 3000); // Remove toast after 3 seconds
			}
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
			className="space-y-4 p-4 bg-base-200 rounded-lg shadow-xl"
		>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Title</span>
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
					<span className="label-text">Slug</span>
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
					<span className="label-text">Content</span>
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
			<div className="form-control">
				<label className="label">
					<span className="label-text">Tags (comma-separated)</span>
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
					<span className="label-text">Cover Image</span>
				</label>
				<input
					type="file"
					accept="image/*"
					onChange={handleCoverImageUpload}
					className="file-input file-input-bordered w-full"
				/>
				{formData.coverImage && (
					<img
						src={formData.coverImage}
						alt="Cover"
						className="mt-2 w-32 h-32 object-cover rounded"
					/>
				)}
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Meta Title</span>
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
					<span className="label-text">Meta Description</span>
				</label>
				<textarea
					name="metaDescription"
					value={formData.metaDescription}
					onChange={handleChange}
					rows={3}
					className="textarea textarea-bordered w-full"
				></textarea>
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Open Graph Image (URL)</span>
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
					<span className="label-text">Status</span>
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
					<span className="label-text">Publish Date</span>
				</label>
				<input
					type="date"
					name="publishDate"
					value={formData.publishDate}
					onChange={handleChange}
					className="input input-bordered w-full"
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				{post ? "Update Post" : "Create Post"}
			</button>
		</form>
	);
};

export default PostForm;
