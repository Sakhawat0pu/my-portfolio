import React, { useEffect, useRef } from "react";

const Giscus: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const currentRef = ref.current; // Capture ref.current

		// Prevent duplicate injection
		if (!currentRef || currentRef.querySelector("iframe")) return;

		const script = document.createElement("script");
		script.src = "https://giscus.app/client.js";
		script.async = true;
		script.crossOrigin = "anonymous";

		script.setAttribute("data-repo", "Sakhawat0pu/my-portfolio");
		script.setAttribute("data-repo-id", "R_kgDOPRr8CQ");
		script.setAttribute("data-category", "Announcements");
		script.setAttribute("data-category-id", "DIC_kwDOPRr8Cc4CazZ1"); // Replace with your actual category ID
		script.setAttribute("data-mapping", "pathname");
		script.setAttribute("data-strict", "0");
		script.setAttribute("data-reactions-enabled", "1");
		script.setAttribute("data-emit-metadata", "0");
		script.setAttribute("data-input-position", "bottom");
		script.setAttribute("data-theme", "preferred_color_scheme");
		script.setAttribute("data-lang", "en");

		currentRef.appendChild(script);

		return () => {
			// Clean up Giscus iframe if component unmounts
			if (currentRef) {
				currentRef.innerHTML = "";
			}
		};
	}, []);

	return <div ref={ref} />;
};

export default Giscus;
