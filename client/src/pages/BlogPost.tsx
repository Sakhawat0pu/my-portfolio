import "highlight.js/styles/github-dark.css";
import mermaid from "mermaid";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaReddit, FaTwitter } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import Giscus from "../components/Giscus";
import ReadingProgressBar from "../components/ReadingProgressBar";
import { getBlogPosts } from "../services/api";
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
					const { data } = await getBlogPosts();
					const foundPost = data.find((p: Post) => p.slug === slug);
					if (foundPost) {
						setPost(foundPost);

						const related = data.filter(
							(p: Post) =>
								p.tags?.some((tag) => foundPost.tags?.includes(tag)) &&
								p._id !== foundPost._id
						);
						setRelatedPosts(related.slice(0, 3));

						// Simplified heading extraction for Table of Contents
						const extractedHeadings: Heading[] = [];
						const matches = foundPost.content.matchAll(/^(#{1,6})\s(.+)$/gm);
						for (const match of matches) {
							const level = match[1].length;
							const text = match[2];
							const id = text
								.toLowerCase()
								.replace(/[^a-z0-9\s-]/g, "")
								.trim()
								.replace(/\s+/g, "-");
							extractedHeadings.push({ level, text, id });
						}
						setHeadings(extractedHeadings);
					}
				} catch (error) {
					console.error("Error fetching blog post:", error);
				}
			}
		};

		fetchPost();
	}, [slug]);

	useEffect(() => {
		if (post) {
			mermaid.initialize({
				startOnLoad: true,
				theme: "dark",
				securityLevel: "loose",
			});
			mermaid.contentLoaded();
		}
	}, [post]);

	if (!post) {
		return <div className="container py-8 text-center">Loading...</div>;
	}

	const shareUrl = window.location.href;
	const shareTitle = post.title;

	return (
		<>
			<div className="bg-base-100 text-base-content min-h-screen">
				<ReadingProgressBar />
				<div className="sticky top-0 z-10 bg-base-100 py-4 mb-8 container mx-auto px-4 sm:px-6 lg:px-8">
					<Link to="/blog" className="btn btn-ghost btn-md">
						&larr; Back to Blog
					</Link>
				</div>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row lg:gap-8">
					{headings.length > 0 && (
						<aside className="lg:w-1/4 self-start mb-8 lg:mb-0">
							<div className="bg-base-200 p-6 rounded-lg shadow-xl">
								<h3 className="text-xl font-bold mb-4">Table of Contents</h3>
								<ul className="space-y-2">
									{headings.map((heading) => (
										<li
											key={heading.id}
											style={{ marginLeft: `${(heading.level - 1) * 1}rem` }}
										>
											<a
												href={`#${heading.id}`}
												className="link link-hover text-base-content opacity-80 hover:opacity-100 transition-opacity"
											>
												{heading.text}
											</a>
										</li>
									))}
								</ul>
							</div>
						</aside>
					)}

					<div className="flex-grow lg:w-3/4">
						<div className="bg-base-200 p-6 sm:p-8 rounded-lg shadow-xl mb-8 mx-auto">
							{post.coverImage && (
								<img
									src={post.coverImage}
									alt={post.title}
									className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8 shadow-lg"
								/>
							)}
							<h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-primary">
								{post.title}
							</h1>
							<div className="flex items-center text-base md:text-lg text-base-content opacity-70 mb-6">
								<img
									src={post.authorImage || "/images/placeholder.svg"}
									alt={
										typeof post.author === "string"
											? post.author
											: post.author
											? `${post.author.firstName} ${post.author.lastName}`
											: "Sakhawat Hossain"
									}
									className="w-10 h-10 rounded-full mr-4 object-cover"
								/>
								<div>
									<span>
										by{" "}
										{post.author
											? `${post.author.firstName} ${post.author.lastName}`
											: "Sakhawat Hossain"}
									</span>
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

							<div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none break-words">
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									rehypePlugins={[
										rehypeSlug,
										[rehypeAutolinkHeadings, { behavior: "wrap" }],
										rehypeHighlight,
									]}
									components={{
										code({
											node,
											inline,
											className,
											children,
											...props
										}: {
											node?: any;
											inline?: boolean;
											className?: string;
											children?: React.ReactNode;
										}) {
											const match = /language-(\w+)/.exec(className || "");
											if (match?.[1] === "mermaid") {
												return (
													<div className="mermaid">
														{String(children).replace(/\n$/, "")}
													</div>
												);
											}
											return !inline && match ? (
												<pre
													style={{
														backgroundColor: "#2d2d2d",
														padding: "1em",
														borderRadius: "0.5em",
														color: "#f8f8f2",
														overflowX: "auto",
														margin: "1em 0",
													}}
												>
													<code className={className} {...props}>
														{children}
													</code>
												</pre>
											) : (
												<code
													style={{
														fontFamily: "monospace",
														fontSize: "0.9em",
														backgroundColor: "#3a3a3a",
														color: "#f8f8f2",
														padding: "0.2em 0.4em",
														borderRadius: "0.3em",
													}}
													className={className}
													{...props}
												>
													{children}
												</code>
											);
										},
										h1: ({ node, ...props }) => (
											<h1
												style={{
													marginTop: "2.5em",
													marginBottom: "1em",
													fontSize: "2.8em",
													fontWeight: "bold",
													lineHeight: "1.2",
													borderBottom: "2px solid #ccc",
													paddingBottom: "0.3em",
												}}
												{...props}
											/>
										),
										h2: ({ node, ...props }) => (
											<h2
												style={{
													marginTop: "2em",
													marginBottom: "0.8em",
													fontSize: "2.2em",
													fontWeight: "bold",
													lineHeight: "1.2",
													borderBottom: "1px solid #eee",
													paddingBottom: "0.2em",
												}}
												{...props}
											/>
										),
										h3: ({ node, ...props }) => (
											<h3
												style={{
													marginTop: "1.8em",
													marginBottom: "0.7em",
													fontSize: "1.8em",
													fontWeight: "bold",
													lineHeight: "1.2",
												}}
												{...props}
											/>
										),
										h4: ({ node, ...props }) => (
											<h4
												style={{
													marginTop: "1.5em",
													marginBottom: "0.6em",
													fontSize: "1.5em",
													fontWeight: "bold",
													lineHeight: "1.2",
												}}
												{...props}
											/>
										),
										h5: ({ node, ...props }) => (
											<h5
												style={{
													marginTop: "1.2em",
													marginBottom: "0.5em",
													fontSize: "1.2em",
													fontWeight: "bold",
													lineHeight: "1.2",
												}}
												{...props}
											/>
										),
										h6: ({ node, ...props }) => (
											<h6
												style={{
													marginTop: "1em",
													marginBottom: "0.4em",
													fontSize: "1em",
													fontWeight: "bold",
													lineHeight: "1.2",
												}}
												{...props}
											/>
										),
										p: ({ node, ...props }) => (
											<p
												style={{ marginBottom: "1.5em", lineHeight: "1.75" }}
												{...props}
											/>
										),
										ul: ({ node, ...props }) => (
											<ul
												style={{
													marginBottom: "1.5em",
													paddingLeft: "2em",
													listStyleType: "disc",
												}}
												{...props}
											/>
										),
										ol: ({ node, ...props }) => (
											<ol
												style={{
													marginBottom: "1.5em",
													paddingLeft: "2em",
													listStyleType: "decimal",
												}}
												{...props}
											/>
										),
										li: ({ node, ...props }) => (
											<li style={{ marginBottom: "0.75em" }} {...props} />
										),
										blockquote: ({ node, ...props }) => (
											<blockquote
												style={{
													borderLeft: "5px solid #ccc",
													paddingLeft: "1.5em",
													margin: "1.5em 0",
													fontStyle: "italic",
													color: "#666",
													backgroundColor: "#f9f9f9",
													borderRadius: "0.3em",
												}}
												{...props}
											/>
										),
										table: ({ node, ...props }) => (
											<table
												style={{
													width: "100%",
													marginBottom: "1.5em",
													borderCollapse: "collapse",
												}}
												{...props}
											/>
										),
										th: ({ node, ...props }) => (
											<th
												style={{
													border: "1px solid #ddd",
													padding: "0.8em",
													textAlign: "left",
													backgroundColor: "#f2f2f2",
												}}
												{...props}
											/>
										),
										td: ({ node, ...props }) => (
											<td
												style={{ border: "1px solid #ddd", padding: "0.8em" }}
												{...props}
											/>
										),
										img: ({ node, ...props }) => (
											<img
												style={{
													maxWidth: "100%",
													height: "auto",
													margin: "2em auto",
													display: "block",
													borderRadius: "0.5em",
													boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
												}}
												{...props}
											/>
										),
										pre: ({ children }) => (
											<pre
												style={{
													backgroundColor: "#2d2d2d",
													padding: "1em",
													borderRadius: "0.5em",
													color: "#f8f8f2",
													overflowX: "auto",
													margin: "1em 0",
												}}
											>
												{children}
											</pre>
										),
									}}
								>
									{post.content}
								</ReactMarkdown>
							</div>

							<div className="mt-8 pt-4 border-t border-base-300 flex justify-center items-center space-x-4">
								<button
									className="btn btn-ghost btn-circle text-error"
									onClick={() => alert("Like functionality coming soon!")}
								>
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

						<div className="mt-16 max-w-4xl mx-auto">
							<h2 className="text-3xl font-bold text-center mb-8">
								Related Posts
							</h2>
							{relatedPosts.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
									{relatedPosts.map((relatedPost) => (
										<Link
											to={`/blog/${relatedPost.slug}`}
											key={relatedPost._id}
											className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
										>
											<figure className="h-48 w-full overflow-hidden">
												{relatedPost.coverImage ? (
													<img
														src={relatedPost.coverImage as string}
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
													{(
														relatedPost.metaDescription || relatedPost.content
													).substring(0, 100)}
													...
												</p>
											</div>
										</Link>
									))}
								</div>
							) : (
								<p className="text-center text-base-content opacity-70">
									No related posts found.
								</p>
							)}
						</div>

						<div className="mt-16 max-w-4xl mx-auto">
							<div className="bg-base-200 p-8 rounded-lg shadow-xl">
								<h2 className="text-2xl font-bold mb-4">About the Author</h2>
								<div className="flex items-center">
									<img
										src={post.authorImage || "/images/placeholder.svg"}
										alt={
											typeof post.author === "string"
												? post.author
												: post.author
												? `${post.author.firstName} ${post.author.lastName}`
												: "Sakhawat Hossain"
										}
										className="w-20 h-20 rounded-full mr-8 object-cover"
									/>
									<div>
										<h3 className="text-xl font-bold">
											{post.author
												? `${post.author.firstName} ${post.author.lastName}`
												: "Sakhawat Hossain"}
										</h3>
										<p className="text-base-content/80 mt-2">
											{post.authorBio ||
												"I am a passionate writer and developer, always eager to share my knowledge with the world."}
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-16 max-w-4xl mx-auto" id="comments">
							<h2 className="text-3xl font-bold text-center mb-8">Comments</h2>
							<div className="bg-base-200 p-8 rounded-lg shadow-xl">
								<Giscus />
								<p className="text-center text-sm text-base-content opacity-70 mt-4">
									Comments powered by Giscus.
								</p>
							</div>
						</div>

						<div className="mt-16 text-center max-w-4xl mx-auto">
							<h2 className="text-3xl font-bold mb-4">Enjoyed this post?</h2>
							<p className="text-lg text-base-content/80 mb-8">
								Share your thoughts in the comments below or explore more of my
								work!
							</p>
							<div className="flex justify-center space-x-4">
								<Link to="/blog" className="btn btn-primary btn-lg">
									Explore More Posts
								</Link>
								<a href="#comments" className="btn btn-secondary btn-lg">
									Leave a Comment
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogPost;
