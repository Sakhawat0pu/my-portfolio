import express from 'express';
import { getUser, updateAboutImage, getPublicProfile } from '../controllers/user';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/public-profile', getPublicProfile);
router.get('/:id', getUser);
router.patch('/about-image', auth, updateAboutImage);

export default router;