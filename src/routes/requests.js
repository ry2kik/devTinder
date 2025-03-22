import express from 'express';
import { userAuth } from '../middlewares/auth.js';
import { connectionRequestController } from '../controllers/requests.js';

const router = express.Router();

router.post('/request/send/:status/:toUserId', userAuth, connectionRequestController);

router.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {
        


    } catch (error) {
        res.status(400).send('ERROR: ', error.message);
    }
})

export default router;