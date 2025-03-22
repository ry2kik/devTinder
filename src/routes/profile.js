import express from 'express';
import { userAuth } from '../middlewares/auth.js';
import { profileViewController, profileEditController, forgotPassword } from '../controllers/profile.js';

const router = express.Router();

router.get('/profile/view', userAuth, profileViewController);
router.patch('/profile/edit', userAuth, profileEditController);
router.patch('/profile/password', userAuth, forgotPassword);

export default router;