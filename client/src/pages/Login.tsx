import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { login } from "../services/api";

const Login: React.FC = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const navigate = useNavigate();
	const auth = useAuth();
	if (!auth) {
		throw new Error(
			"AuthContext is undefined. Make sure your component is wrapped in AuthProvider."
		);
	}
	const { login: authLogin } = auth;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const { data } = await login(formData);
			authLogin(data); // Use auth context login
			navigate("/admin"); // Redirect to admin dashboard after successful login
		} catch (error) {
			console.error("Login failed:", error);
			const toast = document.createElement("div");
			toast.className = "toast toast-top toast-center";
			toast.innerHTML =
				'<div class="alert alert-error"><span>Login failed. Please check your credentials.</span></div>';
			document.body.appendChild(toast);
			setTimeout(() => toast.remove(), 3000); // Remove toast after 3 seconds
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex items-center justify-center p-4 min-h-screen">
			<div className="card w-full max-w-md bg-base-200 shadow-xl rounded-xl">
				<div className="card-body p-10">
					<h2 className="text-4xl font-bold text-center mb-8 text-base-content">
						Login
					</h2>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base-content text-lg">
									Email
								</span>
							</label>
							<input
								type="text"
								name="email"
								placeholder="Enter your email"
								className="input input-bordered w-full input-lg text-base-content"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text text-base-content text-lg">
									Password
								</span>
							</label>
							<input
								type="password"
								name="password"
								placeholder="Enter your password"
								className="input input-bordered w-full input-lg text-base-content"
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-control mt-8">
							<button type="submit" className="btn btn-primary btn-lg w-full">
								Login
							</button>
						</div>
					</form>
					<div className="text-center mt-4">
						<Link to="/" className="btn btn-ghost btn-sm text-base-content">
							Go back to Home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
