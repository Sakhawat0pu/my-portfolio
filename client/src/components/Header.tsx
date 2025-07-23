import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom"; // Import NavLink
import { useAuth } from "../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, logout } = useAuth();

	return (
		<header className="navbar bg-gray-800 text-white shadow-lg sticky top-0 z-50 px-4 sm:px-6 lg:px-8">
			<div className="navbar-start">
				<Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
					My Portfolio
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 text-lg">
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive
									? "text-blue-300"
									: "hover:text-blue-300 transition-colors duration-200"
							}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/projects"
							className={({ isActive }) =>
								isActive
									? "text-blue-300"
									: "hover:text-blue-300 transition-colors duration-200"
							}
						>
							Projects
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/blog"
							className={({ isActive }) =>
								isActive
									? "text-blue-300"
									: "hover:text-blue-300 transition-colors duration-200"
							}
						>
							Blog
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/resume"
							className={({ isActive }) =>
								isActive
									? "text-blue-300"
									: "hover:text-blue-300 transition-colors duration-200"
							}
						>
							Resume
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/contact"
							className={({ isActive }) =>
								isActive
									? "text-blue-300"
									: "hover:text-blue-300 transition-colors duration-200"
							}
						>
							Contact
						</NavLink>
					</li>
					{user && (
						<li>
							<NavLink
								to="/admin"
								className={({ isActive }) =>
									isActive
										? "text-blue-300"
										: "hover:text-blue-300 transition-colors duration-200"
								}
							>
								Dashboard
							</NavLink>
						</li>
					)}
				</ul>
			</div>
			<div className="navbar-end space-x-2">
				{user ? (
					<>
						<span className="text-white text-lg font-medium mr-4 hidden md:block">
							{user.result.firstName} {user.result.lastName}
						</span>
						<ProfileDropdown />
					</>
				) : (
					<Link
						to="/login"
						className="btn btn-ghost text-white hover:text-blue-300"
					>
						Login
					</Link>
				)}
				<ThemeToggle />
				<div className="dropdown dropdown-end lg:hidden">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost lg:hidden"
						onClick={() => setIsOpen(!isOpen)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-800 rounded-box w-52 ${
							isOpen ? "" : "hidden"
						}`}
					>
						<li>
							<NavLink
								to="/"
								onClick={() => setIsOpen(false)}
								className={({ isActive }) => (isActive ? "text-blue-300" : "")}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/projects"
								onClick={() => setIsOpen(false)}
								className={({ isActive }) => (isActive ? "text-blue-300" : "")}
							>
								Projects
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/blog"
								onClick={() => setIsOpen(false)}
								className={({ isActive }) => (isActive ? "text-blue-300" : "")}
							>
								Blog
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/resume"
								onClick={() => setIsOpen(false)}
								className={({ isActive }) => (isActive ? "text-blue-300" : "")}
							>
								Resume
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/contact"
								onClick={() => setIsOpen(false)}
								className={({ isActive }) => (isActive ? "text-blue-300" : "")}
							>
								Contact
							</NavLink>
						</li>
						{user && (
							<li>
								<NavLink
									to="/admin"
									onClick={() => setIsOpen(false)}
									className={({ isActive }) =>
										isActive ? "text-blue-300" : ""
									}
								>
									Dashboard
								</NavLink>
							</li>
						)}
						{user ? (
							<li>
								<button
									onClick={() => {
										logout();
										setIsOpen(false);
									}}
									className="btn btn-ghost"
								>
									Logout
								</button>
							</li>
						) : (
							<li>
								<NavLink
									to="/login"
									onClick={() => setIsOpen(false)}
									className={({ isActive }) =>
										isActive ? "text-blue-300" : ""
									}
								>
									Login
								</NavLink>
							</li>
						)}
					</ul>
				</div>
			</div>
		</header>
	);
};

export default Header;