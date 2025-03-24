import express from 'express';
import { userAuth } from '../middlewares/auth.js';
import { connectionRequestController, requestReviewController } from '../controllers/requests.js';

const router = express.Router();

router.post('/request/send/:status/:toUserId', userAuth, connectionRequestController);

router.post('/request/review/:status/:requestId', userAuth, requestReviewController);

export default router;