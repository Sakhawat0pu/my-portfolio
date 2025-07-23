import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = () => {
	const location = useLocation();
	const hideNavAndFooter = location.pathname === "/login";
	const style =
		location.pathname === "/login"
			? "flex-grow container mx-auto"
			: "flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8";

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") || "light";
		document.documentElement.setAttribute("data-theme", storedTheme);
	}, []);

	return (
		<div className="min-h-screen flex flex-col bg-base-100 text-base-content transition-colors duration-300">
			{!hideNavAndFooter && <Header />}
			<main className={style}>
				<Outlet />
			</main>
			{!hideNavAndFooter && <Footer />}
		</div>
	);
};

export default MainLayout;
