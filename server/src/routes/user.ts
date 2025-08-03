import express from 'express';
import { getUser, uploadAboutImage, getAboutImage, uploadAboutImageMiddleware } from '../controllers/user';
import auth, { isAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/:id', getUser);
router.post('/about/image', auth, isAdmin, uploadAboutImageMiddleware, uploadAboutImage);
router.get('/about/image', getAboutImage);

export default router;