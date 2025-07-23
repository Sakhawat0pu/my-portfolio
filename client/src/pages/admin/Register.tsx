import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/api";

const Register: React.FC = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "user", // Default role
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			await register({
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				password: formData.password,
				role: formData.role,
			});
			alert("User registered successfully");
			navigate("/admin");
		} catch (error) {
			console.error("Registration failed:", error);
			alert("Registration failed");
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-lg">
			<h1 className="text-4xl font-bold mb-8 text-center">Register New User</h1>
			<div className="bg-base-200 p-8 rounded-lg shadow-xl">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text">First Name</span>
							</label>
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								className="input input-bordered w-full"
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Last Name</span>
							</label>
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								className="input input-bordered w-full"
								required
							/>
						</div>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="input input-bordered w-full"
							required
						/>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text">Role</span>
						</label>
						<select
							name="role"
							value={formData.role}
							onChange={handleChange}
							className="select select-bordered w-full"
						>
							<option value="user">User</option>
							<option value="admin">Admin</option>
						</select>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								className="input input-bordered w-full"
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Confirm Password</span>
							</label>
							<input
								type="password"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								className="input input-bordered w-full"
								required
							/>
						</div>
					</div>

					<div className="mt-6 flex justify-end space-x-2">
						<button type="submit" className="btn btn-primary">
							Register User
						</button>
						<button
							type="button"
							onClick={() => navigate("/admin")}
							className="btn btn-outline btn-secondary"
						>
							Go back to Dashboard
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
