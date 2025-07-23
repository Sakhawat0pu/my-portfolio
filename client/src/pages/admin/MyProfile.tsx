import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const MyProfile: React.FC = () => {
	const { user } = useAuth();

	// renderField helper now always renders read-only view
	const renderField = (label: string, value: string | undefined) => (
		<div className="form-control">
			<label className="label">
				<span className="label-text font-semibold text-lg">{label}</span>
			</label>
			<p className="text-base-content text-lg py-2 px-3 border border-base-300 rounded-lg bg-base-100">
				{value || "N/A"}
			</p>
		</div>
	);

	if (!user) {
		return (
			<div className="container py-8 text-center">
				Please log in to view your profile.
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-lg">
			<h1 className="text-4xl font-bold mb-8 text-center">My Profile</h1>
			<div className="bg-base-200 p-8 rounded-lg shadow-xl">
				{/* Display Profile Information */}
				<div className="space-y-4">
					

					{/* Name Fields */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{renderField("First Name", user.result.firstName)}
						{renderField("Last Name", user.result.lastName)}
					</div>

					{/* Contact Fields */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{renderField("Email", user.result.email)}
						{renderField("Phone", user.result.phone)}
					</div>

					{/* Role and Website Fields */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{renderField("Role", user.result.role.charAt(0).toUpperCase() + user.result.role.slice(1))}
						{renderField("Website", user.result.website)}
					</div>

					

					{/* Address Fields */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{renderField("City", user.result.city)}
						{renderField("State", user.result.state)}
						{renderField("Country", user.result.country)}
					</div>
				</div>

				<div className="mt-6 flex justify-end">
					<Link to="/admin/update-profile" className="btn btn-primary">
						Edit Profile
					</Link>
				</div>
				<div className="mt-12 text-center">
					<Link to="/admin" className="btn btn-outline btn-info">
						Back to Dashboard
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MyProfile;
