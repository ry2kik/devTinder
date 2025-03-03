import express from 'express';
import { feedController, getUsers, loginController, patchController, profileController, signupController } from '../controllers/user.js';

const router = express.Router();

router.get('/user', getUsers);
router.get('/feed', feedController);
router.post('/login', loginController);
router.post('/signup', signupController);
router.patch('/user/:userId', patchController);
router.get('/profile', profileController)

export default router;