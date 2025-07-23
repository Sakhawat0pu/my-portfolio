import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { updateProfile } from "../../services/api";

const UpdateProfile: React.FC = () => {
	const { user, login } = useAuth();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstName: user?.result?.firstName || "",
		lastName: user?.result?.lastName || "",
		email: user?.result?.email || "",
		phone: user?.result?.phone || "",
		website: user?.result?.website || "",
		city: user?.result?.city || "",
		state: user?.result?.state || "",
		country: user?.result?.country || "",
		role: user?.result?.role || "user",
	});

	useEffect(() => {
		if (user) {
			setFormData({
				firstName: user.result.firstName || "",
				lastName: user.result.lastName || "",
				email: user.result.email || "",
				phone: user.result.phone || "",
				website: user.result.website || "",
				city: user.result.city || "",
				state: user.result.state || "",
				country: user.result.country || "",
				role: user.result.role || "user",
			});
		}
	}, [user]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await updateProfile(formData);
			const updatedResult = response?.data?.result || response?.data || {};
			login({ ...user, result: updatedResult, token: user?.token ?? "" });
			const toast = document.createElement("div");
			toast.className = "toast toast-top toast-center";
			toast.innerHTML = `<div class="alert alert-success"><span>Profile updated successfully!</span></div>`;
			document.body.appendChild(toast);
			setTimeout(() => toast.remove(), 3000);
			navigate("/admin/my-profile"); // Navigate back to view profile
		} catch (error) {
			console.error("Update profile failed:", error);
			const toast = document.createElement("div");
			toast.className = "toast toast-top toast-center";
			toast.innerHTML = `<div class="alert alert-error"><span>Failed to update profile.</span></div>`;
			document.body.appendChild(toast);
			setTimeout(() => toast.remove(), 3000);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	if (!user) {
		return (
			<div className="container py-8 text-center">
				Please log in to view your profile.
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-lg">
			<h1 className="text-4xl font-bold mb-8 text-center">Update Profile</h1>
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

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
								<span className="label-text">Phone</span>
							</label>
							<input
								type="text"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								className="input input-bordered w-full"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Role</span>
							</label>
							{user?.result.role === 'admin' ? (
								<select
									name="role"
									value={formData.role}
									onChange={handleChange}
									className="select select-bordered w-full"
								>
									<option value="user">User</option>
									<option value="admin">Admin</option>
								</select>
							) : (
								<div className="input input-bordered w-full flex items-center bg-base-200 cursor-not-allowed">
									{formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
								</div>
							)}
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Website</span>
							</label>
							<input
								type="text"
								name="website"
								value={formData.website}
								onChange={handleChange}
								className="input input-bordered w-full"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text">City</span>
							</label>
							<input
								type="text"
								name="city"
								value={formData.city}
								onChange={handleChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">State</span>
							</label>
							<input
								type="text"
								name="state"
								value={formData.state}
								onChange={handleChange}
								className="input input-bordered w-full"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Country</span>
							</label>
							<input
								type="text"
								name="country"
								value={formData.country}
								onChange={handleChange}
								className="input input-bordered w-full"
							/>
						</div>
					</div>

					<div className="mt-6 flex justify-end space-x-2">
						<button type="submit" className="btn btn-primary">
							Save Changes
						</button>
						<button
							type="button"
							onClick={() => navigate(-1)}
							className="btn btn-outline btn-secondary"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateProfile;
