import express from 'express';
import { userAuth } from '../middlewares/auth.js';
import { connectionRequestController, feedController, getUsers, loginController, patchController, profileController, signupController } from '../controllers/user.js';

const router = express.Router();

router.get('/user', getUsers);
router.get('/feed', feedController);
router.post('/login', loginController);
router.post('/signup', signupController);
router.patch('/user/:userId', patchController);
router.get('/profile', userAuth, profileController);
router.post('/sendConnectionRequest', userAuth, connectionRequestController);

export default router;