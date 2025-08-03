import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogPosts } from "../services/api";
import type { Post } from "../types";
import { calculateReadingTime } from "../utils/blogUtils";

const Blog: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const { data } = await getBlogPosts();
				setPosts(data.filter((post: Post) => post.status === "published")); // Only show published posts
			} catch (error) {
				console.error("Error fetching blog posts:", error);
				setPosts([]); // Ensure posts is an empty array on error
			}
		};

		fetchPosts();
	}, []);

	const filteredPosts = posts.filter((post) =>
		post.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="container py-8">
			<h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
			<div className="mb-8 flex justify-center">
				<input
					type="text"
					placeholder="Search posts..."
					className="input input-bordered w-full max-w-md"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{filteredPosts && filteredPosts.length > 0 ? (
					filteredPosts.map((post) => (
						<Link
							to={`/blog/${post.slug}`}
							key={post._id}
							className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
						>
							<figure className="h-48 w-full overflow-hidden">
								{post.coverImage ? (
									<img
										src={post.coverImage as string}
										alt={post.title}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
										No Image
									</div>
								)}
							</figure>
							<div className="card-body">
								<h2 className="card-title text-xl font-bold">{post.title}</h2>
								<p className="text-sm text-base-content opacity-80">
									{post.metaDescription || post.content.substring(0, 100)}...
								</p>
								<div className="card-actions justify-end mt-4">
									{post.tags?.map((tag, index) => (
										<div
											key={index}
											className="badge badge-outline badge-primary"
										>
											{tag}
										</div>
									))}
								</div>
								<p className="text-xs text-gray-500 mt-2">
									{post.createdAt &&
										`Published on ${new Date(
											post.createdAt
										).toLocaleDateString()}`}{" "}
									&bull; {calculateReadingTime(post.content)} min read
								</p>
							</div>
						</Link>
					))
				) : (
					<p className="col-span-full text-center">No blog posts available.</p>
				)}
			</div>
		</div>
	);
};

export default Blog;
