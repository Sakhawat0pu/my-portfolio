import express from 'express';
import { getProjects, getProject, createProject, updateProject, deleteProject } from '../controllers/projects';
import auth, { isAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', auth, isAdmin, createProject);
router.patch('/:id', auth, isAdmin, updateProject);
router.delete('/:id', auth, isAdmin, deleteProject);

export default router;