import { createContext } from "react";

export interface Post {
	_id: string;
	title: string;
	slug: string;
	content: string;
	author?: {
		firstName: string;
		lastName: string;
	};
	tags?: string[];
	coverImage?: string;
	metaTitle?: string;
	metaDescription?: string;
	authorImage?: string;
	authorBio?: string;
	ogImage?: string;
	status?: "draft" | "published";
	publishDate?: string;
	createdAt?: string;
}

export interface Project {
	_id: string;
	name: string;
	description: string;
	frontendRepo: string;
	backendRepo?: string;
	liveLink: string;
	languages: string[];
	frameworks: string[];
	toolsUsed: string[];
	coverImage?: string;
	createdAt?: string;
}

export interface ContactMessage {
	name: string;
	email: string;
	message: string;
}

export interface User {
	result: {
		_id: string;
		firstName: string;
		lastName: string;
		email: string;
		role: string;
		password: string;
		phone?: string;
		website?: string;
		city?: string;
		state?: string;
		country?: string;
		aboutImage?: string;
	};
	token: string;
}

export interface AuthContextType {
	user: User | null;
	login: (userData: User) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);
