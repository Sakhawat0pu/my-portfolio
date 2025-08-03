import axios from "axios";
import type { ContactMessage, Post, User, Project } from "../types";

const API_URL = "http://localhost:4000/api"; // Changed port to 4000

export const api = axios.create({ baseURL: API_URL });

let onLogout: (() => void) | null = null;

export const setAuthLogout = (logoutFn: () => void) => {
  onLogout = logoutFn;
};

api.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile") as string).token
		}`;
	}
	return req;
});

api.interceptors.response.use(
	(res) => res,
	(error) => {
		if (error.response && error.response.status === 401) {
			if (onLogout) {
				onLogout();
			}
		}
		return Promise.reject(error);
	}
);

// Auth
export const login = (formData: Pick<User["result"], "email" | "password">) =>
	api.post<User>("/auth/login", formData);
export const register = (formData: Omit<User["result"], "_id">) =>
	api.post<User>("/auth/register", formData);
export const changePassword = (formData: {
	oldPassword?: string;
	newPassword?: string;
}) => api.patch("/auth/change-password", formData);
export const updateProfile = (
	formData: Partial<Omit<User["result"], "_id" | "password">>
) => api.patch<User>("/auth/profile", formData);
export const updateProfilePicture = (formData: { profilePicture: string }) =>
	api.patch<User>("/auth/profile-picture", formData);
export const getAboutImage = () => api.get<{ image: string }>("/user/about/image");
export const uploadAboutImage = (formData: FormData) =>
	api.post<{ message: string }>("/user/about/image", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

// User
export const getUser = (id: string) => api.get<User["result"]>(`/user/${id}`);

// Posts
export const getBlogPosts = (userId?: string) =>
	api.get<Post[]>(userId ? `/posts/user/${userId}` : "/posts");
export const getBlogPost = (id: string) => api.get<Post>(`/posts/${id}`);
export const getBlogPostBySlug = (slug: string) => api.get<Post>(`/posts/slug/${slug}`);
export const createPost = (newPost: Omit<Post, "_id">) =>
	api.post<Post>("/posts", newPost);
export const updatePost = (id: string, updatedPost: Partial<Post>) =>
	api.patch<Post>(`/posts/${id}`, updatedPost);
export const deletePost = (id: string) => api.delete(`/posts/${id}`);

// Projects
export const getProjects = () => api.get<Project[]>("/projects");
export const getProject = (id: string) => api.get<Project>(`/projects/${id}`);
export const createProject = (newProject: Omit<Project, "_id">) =>
	api.post<Project>("/projects", newProject);
export const updateProject = (id: string, updatedProject: Partial<Project>) =>
	api.patch<Project>(`/projects/${id}`, updatedProject);
export const deleteProject = (id: string) => api.delete(`/projects/${id}`);

// Contact
export const sendMessage = (message: ContactMessage) =>
	api.post("/contact", message);

// Upload
export const uploadImage = (postId: string, formData: FormData) =>
	api.post<{ filePath: string }>(`/upload/${postId}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
