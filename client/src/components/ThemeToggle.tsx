import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button onClick={toggleTheme} className="btn btn-ghost btn-circle">
			{theme === "light" ? <MdDarkMode size={24} /> : <MdLightMode size={24} />}
		</button>
	);
};

export default ThemeToggle;
