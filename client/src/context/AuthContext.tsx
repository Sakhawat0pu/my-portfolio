import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, type User } from "../types";
import { setAuthLogout } from "../services/api";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(() => {
		const profile = localStorage.getItem("profile");
		return profile ? JSON.parse(profile) : null;
	});
	const navigate = useNavigate();

	const login = (userData: User) => {
		setUser(userData);
		localStorage.setItem("profile", JSON.stringify(userData));
	};

	const logout = useCallback(() => {
		setUser(null);
		localStorage.removeItem("profile");
		navigate("/login");
	}, [navigate]);

	useEffect(() => {
		setAuthLogout(logout);
	}, [logout]);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// export const useAuth = () => useContext(AuthContext);
