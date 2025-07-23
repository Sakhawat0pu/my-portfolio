import express from 'express';
import { register, login, changePassword, updateProfile, updateProfilePicture } from '../controllers/auth';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/register', auth, register);
router.post('/login', login);
router.patch('/change-password', auth, changePassword);
router.patch('/profile', auth, updateProfile);
router.patch('/profile-picture', auth, updateProfilePicture);

export default router;
