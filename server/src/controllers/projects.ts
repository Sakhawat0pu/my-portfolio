import { Request, Response } from "express";
import Project from "../models/project";

export const getProjects = async (req: Request, res: Response) => {
	try {
		const projects = await Project.find();
		res.status(200).json(projects);
	} catch (error: unknown) {
		res.status(500).json({ message: "Server error" });
	}
};

export const getProject = async (req: Request, res: Response) => {
	try {
		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}
		res.status(200).json(project);
	} catch (error: unknown) {
		res.status(500).json({ message: "Server error" });
	}
};

export const createProject = async (req: Request, res: Response) => {
	const project = req.body;
	const newProject = new Project(project);
	try {
		await newProject.save();
		res.status(201).json(newProject);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		res.status(409).json({ message });
	}
};

export const updateProject = async (req: Request, res: Response) => {
	const { id } = req.params;
	const project = req.body;
	try {
		const updatedProject = await Project.findByIdAndUpdate(id, project, {
			new: true,
		});
		res.json(updatedProject);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		res.status(409).json({ message });
	}
};

export const deleteProject = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await Project.findByIdAndDelete(id);
		res.json({ message: "Project deleted successfully." });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		res.status(409).json({ message });
	}
};
