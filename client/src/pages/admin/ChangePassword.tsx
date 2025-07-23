import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changePassword } from "../../services/api";

const ChangePassword: React.FC = () => {
	const [formData, setFormData] = useState({
		oldPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.newPassword !== formData.confirmNewPassword) {
			const toast = document.createElement("div");
			toast.className = "toast toast-top toast-center";
			toast.innerHTML =
				'<div class="alert alert-error"><span>New passwords do not match.</span></div>';
			document.body.appendChild(toast);
			setTimeout(() => toast.remove(), 3000);
			return;
		}

		try {
			await changePassword({
				oldPassword: formData.oldPassword,
				newPassword: formData.newPassword,
			});
			const toast = document.createElement("div");
			toast.className = "toast toast-top toast-center";
			toast.innerHTML =
				'<div class="alert alert-success"><span>Password changed successfully!</span></div>';
			document.body.appendChild(toast);
			setTimeout(() => toast.remove(), 3000);
			navigate("/admin");
		} catch (error: unknown) {
			console.error("Change password failed:", error);
			const toast = document.createElement("div");
			toast.className = "toast toast-top toast-center";
			toast.innerHTML =
				'<div class="alert alert-error"><span>Failed to change password.</span></div>';
			document.body.appendChild(toast);
			setTimeout(() => toast.remove(), 3000);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
			<div className="card w-full max-w-md bg-base-100 shadow-xl rounded-lg">
				<div className="card-body p-8">
					<h2 className="card-title text-4xl font-bold text-center mb-8">
						Change Password
					</h2>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="form-control">
							<label className="label">
								<span className="label-text text-lg">Old Password</span>
							</label>
							<input
								type="password"
								name="oldPassword"
								placeholder="Enter old password"
								className="input input-bordered w-full input-lg"
								value={formData.oldPassword}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text text-lg">New Password</span>
							</label>
							<input
								type="password"
								name="newPassword"
								placeholder="Enter new password"
								className="input input-bordered w-full input-lg"
								value={formData.newPassword}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text text-lg">Confirm New Password</span>
							</label>
							<input
								type="password"
								name="confirmNewPassword"
								placeholder="Confirm new password"
								className="input input-bordered w-full input-lg"
								value={formData.confirmNewPassword}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-control mt-8">
							<button type="submit" className="btn btn-primary btn-lg w-full">
								Change Password
							</button>
						</div>
					</form>
					<div className="text-center mt-4">
						<Link
							to="/admin"
							className="btn btn-ghost btn-sm text-base-content"
						>
							Back to Dashboard
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
