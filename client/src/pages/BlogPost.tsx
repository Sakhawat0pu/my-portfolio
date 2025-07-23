import React, { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaReddit, FaTwitter } from "react-icons/fa";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import Giscus from "../components/Giscus";
import ReadingProgressBar from "../components/ReadingProgressBar";
import { getBlogPosts } from "../services/api"; // getBlogPosts to find by slug
import type { Post } from "../types";
import { calculateReadingTime } from "../utils/blogUtils";

interface Heading {
	level: number;
	text: string;
	id: string;
}

const BlogPost: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const [post, setPost] = useState<Post | null>(null);
	const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
	const [headings, setHeadings] = useState<Heading[]>([]);

	useEffect(() => {
		const fetchPost = async () => {
			if (slug) {
				try {
					const { data } = await getBlogPosts(); // Fetch all posts to find by slug
					const foundPost = data.find((p: Post) => p.slug === slug);
					if (foundPost) {
						setPost(foundPost);

						// Fetch related posts
						const related = data.filter(
							(p: Post) =>
								p.tags?.some((tag) => foundPost.tags?.includes(tag)) &&
								p._id !== foundPost._id
						);
						setRelatedPosts(related.slice(0, 3));
					}

					// Extract headings for Table of Contents
					if (foundPost && foundPost.content) {
						const extractedHeadings: Heading[] = [];
						const lines = foundPost.content.split("\n");
						interface MarkdownHeadingMatch {
							0: string;
							1: string;
							2: string;
							index?: number;
							input?: string;
							groups?: Record<string, string>;
						}

						lines.forEach((line: string) => {
							const match = line.match(
								/^(#+)\s(.+)$/
							) as MarkdownHeadingMatch | null;
							if (match) {
								const level: number = match[1].length;
								const text: string = match[2];
								const id: string = text
									.toLowerCase()
									.replace(/[^a-z0-9]+/g, "-")
									.replace(/^-*|-*$/g, "");
								extractedHeadings.push({ level, text, id });
							}
						});
						setHeadings(extractedHeadings);
					}
				} catch (error) {
					console.error("Error fetching blog post:", error);
				}
			}
		};

		fetchPost();
	}, [slug]);

	if (!post) {
		return <div className="container py-8 text-center">Loading...</div>;
	}

	const components: Components = {
		code: ({
			inline,
			className,
			children,
			...props
		}: React.HTMLAttributes<HTMLElement> & {
			inline?: boolean;
			node?: unknown;
		}) => {
			const match = /language-(\w+)/.exec(className || "");
			return !inline && match ? (
				<SyntaxHighlighter
					style={dracula as any}
					language={match[1]}
					PreTag="div"
					{...props}
				>
					{String(children).replace(/\n$/, "")}
				</SyntaxHighlighter>
			) : (
				<code className={className} {...props}>
					{children}
				</code>
			);
		},
		h1: ({ ...props }) => (
			<h1
				id={props.children
					?.toString()
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/^-*|-*$/g, "")}
				{...props}
			/>
		),
		h2: ({ ...props }) => (
			<h2
				id={props.children
					?.toString()
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/^-*|-*$/g, "")}
				{...props}
			/>
		),
		h3: ({ ...props }) => (
			<h3
				id={props.children
					?.toString()
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/^-*|-*$/g, "")}
				{...props}
			/>
		),
		h4: ({ ...props }) => (
			<h4
				id={props.children
					?.toString()
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/^-*|-*$/g, "")}
				{...props}
			/>
		),
		h5: ({ ...props }) => (
			<h5
				id={props.children
					?.toString()
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/^-*|-*$/g, "")}
				{...props}
			/>
		),
		h6: ({ ...props }) => (
			<h6
				id={props.children
					?.toString()
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/^-*|-*$/g, "")}
				{...props}
			/>
		),
	};

	const shareUrl = window.location.href;
	const shareTitle = post.title;

	return (
		<>
			<ReadingProgressBar />
			<div className="bg-base-100 text-base-content min-h-screen">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="mb-8">
						<Link to="/blog" className="btn btn-ghost btn-md">
							&larr; Back to Blog
						</Link>
					</div>
					<div className="flex flex-col lg:flex-row gap-8">
						{/* Table of Contents */}
						{headings.length > 0 && (
							<div className="lg:w-1/4 bg-base-200 p-6 rounded-lg shadow-xl lg:sticky lg:top-24 self-start">
								<h3 className="text-xl font-bold mb-4">Table of Contents</h3>
								<ul className="space-y-2">
									{headings.map((heading, index) => (
										<li
											key={index}
											className={`text-base ml-${heading.level * 4}`}
										>
											<a
												href={`#${heading.id}`}
												className="link link-hover text-base-content opacity-80 hover:opacity-100"
											>
												{heading.text}
											</a>
										</li>
									))}
								</ul>
							</div>
						)}

						{/* Blog Post Content */}
						<div
							className={`bg-base-200 p-8 rounded-lg shadow-xl mb-8 max-w-3xl mx-auto ${
								headings.length > 0 ? "lg:w-3/4" : "w-full"
							}`}
						>
							{post.coverImage && (
								<img
									src={post.coverImage}
									alt={post.title}
									className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
								/>
							)}
							<h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-primary">
								{post.title}
							</h1>
							<div className="flex items-center text-lg text-base-content opacity-70 mb-6">
								<img
									src="/path-to-author-image.jpg" // Add a path to your author image
									alt="author"
									className="w-10 h-10 rounded-full mr-4"
								/>
								<div>
									<span>by {post.author || "Admin"}</span>
									<span className="mx-2">&bull;</span>
									<span>
										{new Date(
											post.publishDate ?? post.createdAt ?? ""
										).toLocaleDateString()}
									</span>
									<span className="mx-2">&bull;</span>
									<span>{calculateReadingTime(post.content)} min read</span>
								</div>
							</div>
							<div className="flex flex-wrap gap-2 mb-8">
								{post.tags?.map((tag, index) => (
									<div
										key={index}
										className="badge badge-lg badge-outline badge-secondary"
									>
										{tag}
									</div>
								))}
							</div>
							<article className="prose lg:prose-xl dark:prose-invert max-w-none text-lg leading-relaxed">
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									components={components}
								>
									{post.content}
								</ReactMarkdown>
							</article>
							<div className="mt-8 pt-4 border-t border-base-300 flex justify-center items-center space-x-4">
								<button className="btn btn-ghost btn-circle">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
										/>
									</svg>
								</button>
								<a
									href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-circle btn-ghost text-info"
								>
									<FaTwitter size={24} />
								</a>
								<a
									href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-circle btn-ghost text-info"
								>
									<FaLinkedin size={24} />
								</a>
								<a
									href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-circle btn-ghost text-info"
								>
									<FaFacebook size={24} />
								</a>
								<a
									href={`https://www.reddit.com/submit?url=${shareUrl}&title=${shareTitle}`}
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-circle btn-ghost text-info"
								>
									<FaReddit size={24} />
								</a>
							</div>
						</div>
						<div className="mt-16">
							<h2 className="text-3xl font-bold text-center mb-8">
								Related Posts
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{relatedPosts.map((relatedPost) => (
									<Link
										to={`/blog/${relatedPost.slug}`}
										key={relatedPost._id}
										className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
									>
										<figure className="h-48 w-full overflow-hidden">
											{relatedPost.coverImage ? (
												<img
													src={relatedPost.coverImage}
													alt={relatedPost.title}
													className="w-full h-full object-cover"
												/>
											) : (
												<div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
													No Image
												</div>
											)}
										</figure>
										<div className="card-body">
											<h2 className="card-title text-xl font-bold">
												{relatedPost.title}
											</h2>
											<p className="text-sm text-base-content opacity-80">
												{relatedPost.metaDescription ||
													relatedPost.content.substring(0, 100)}
												...
											</p>
										</div>
									</Link>
								))}
							</div>
						</div>
						<div className="mt-16">
							<div className="bg-base-200 p-8 rounded-lg shadow-xl">
								<h2 className="text-2xl font-bold mb-4">About the Author</h2>
								<div className="flex items-center">
									<img
										src="/path-to-author-image.jpg" // Add a path to your author image
										alt="author"
										className="w-20 h-20 rounded-full mr-8"
									/>
									<div>
										<h3 className="text-xl font-bold">
											{post.author || "Admin"}
										</h3>
										<p className="text-base-content/80 mt-2">
											I am a passionate writer and developer, always eager to
											share my knowledge with the world.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-16">
							<h2 className="text-3xl font-bold text-center mb-8">Comments</h2>
							<div className="bg-base-200 p-8 rounded-lg shadow-xl">
								<Giscus />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogPost;
