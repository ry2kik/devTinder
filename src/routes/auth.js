import express from 'express';
import { loginController, logoutController, signupController } from '../controllers/user.js';

const router = express.Router();

// router.get('/user', getUsers);
// router.get('/feed', feedController);
router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/logout', logoutController);
// router.patch('/user/:userId', patchController);
// router.post('/sendConnectionRequest', userAuth, connectionRequestController);

export default router;