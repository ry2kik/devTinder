import express from 'express';
import { feedController, getUsers, loginController, patchController, signupController } from '../controllers/user.js';
const router = express.Router();

router.get('/feed', feedController);
router.get('/user', getUsers);
router.post('/signup', signupController);
router.post('/login', loginController);
router.patch('/user/:userId', patchController);

export default router;