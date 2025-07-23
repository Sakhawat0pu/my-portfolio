import { motion } from "framer-motion";
import React from "react";
import {
	FaAws,
	FaBrain,
	FaDocker,
	FaGitAlt,
	FaJs,
	FaNodeJs,
	FaPython,
	FaReact,
} from "react-icons/fa";
import {
	SiBootstrap,
	SiDjango,
	SiFlask,
	SiGraphql,
	SiJest,
	SiKubernetes,
	SiMongodb,
	SiMongoose,
	SiMui,
	SiMysql,
	SiNextdotjs,
	SiPostgresql,
	SiPrisma,
	SiTailwindcss,
	SiTypescript,
	SiVite,
} from "react-icons/si";

const skills = [
	{ name: "AWS", icon: <FaAws size={48} />, color: "hover:text-orange-500" },
	{
		name: "Docker",
		icon: <FaDocker size={48} />,
		color: "hover:text-blue-500",
	},
	{
		name: "Kubernetes",
		icon: <SiKubernetes size={48} />,
		color: "hover:text-blue-700",
	},
	{ name: "Git", icon: <FaGitAlt size={48} />, color: "hover:text-red-600" },
	{
		name: "Python",
		icon: <FaPython size={48} />,
		color: "hover:text-yellow-400",
	},
	{
		name: "TypeScript",
		icon: <SiTypescript size={48} />,
		color: "hover:text-blue-400",
	},
	{
		name: "JavaScript",
		icon: <FaJs size={48} />,
		color: "hover:text-yellow-500",
	},
	{ name: "React", icon: <FaReact size={48} />, color: "hover:text-blue-300" },
	{
		name: "Next.js",
		icon: <SiNextdotjs size={48} />,
		color: "hover:text-white",
	},
	{
		name: "Node.js",
		icon: <FaNodeJs size={48} />,
		color: "hover:text-green-500",
	},
	{
		name: "Django",
		icon: <SiDjango size={48} />,
		color: "hover:text-green-800",
	},
	{ name: "Flask", icon: <SiFlask size={48} />, color: "hover:text-white" },
	{
		name: "PostgreSQL",
		icon: <SiPostgresql size={48} />,
		color: "hover:text-blue-600",
	},
	{
		name: "MongoDB",
		icon: <SiMongodb size={48} />,
		color: "hover:text-green-600",
	},
	{ name: "MySQL", icon: <SiMysql size={48} />, color: "hover:text-blue-500" },
	{
		name: "GraphQL",
		icon: <SiGraphql size={48} />,
		color: "hover:text-pink-500",
	},
	{
		name: "Prisma",
		icon: <SiPrisma size={48} />,
		color: "hover:text-teal-500",
	},
	{
		name: "Mongoose",
		icon: <SiMongoose size={48} />,
		color: "hover:text-red-700",
	},
	{ name: "Jest", icon: <SiJest size={48} />, color: "hover:text-red-500" },
	{
		name: "Vitest",
		icon: <SiVite size={48} />,
		color: "hover:text-purple-500",
	},
	{ name: "LLMs", icon: <FaBrain size={48} />, color: "hover:text-pink-400" },
	{
		name: "Tailwind CSS",
		icon: <SiTailwindcss size={48} />,
		color: "hover:text-teal-400",
	},
	{
		name: "Material-UI",
		icon: <SiMui size={48} />,
		color: "hover:text-blue-500",
	},
	{
		name: "Bootstrap",
		icon: <SiBootstrap size={48} />,
		color: "hover:text-purple-600",
	},
];

const Skills: React.FC = () => {
	return (
		<section className="container py-16">
			<h2 className="text-4xl font-bold text-center mb-12">My Skills</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
				{skills.map((skill, index) => (
					<motion.div
						key={index}
						className={`flex flex-col items-center justify-center p-6 bg-base-200 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl ${skill.color}`}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, delay: index * 0.05 }}
					>
						{skill.icon}
						<p className="mt-4 text-lg font-semibold">{skill.name}</p>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default Skills;
