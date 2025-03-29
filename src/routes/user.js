import express from 'express';
import User from '../models/user.js';
import { userAuth } from '../middlewares/auth.js';
import ConnectionRequests from '../models/connectionRequest.js';
const router = express.Router();

router.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequests.find({
            toUserId: loggedInUser._id,
            status: 'interested'
        }).populate('fromUserId', ['firstName', 'lastName']);

        res.status(200).json({
            message: 'Data fetched successfully',
            data: connectionRequests
        });
    } catch (error) {
        res.status(400).send('ERROR: ' + error.message);
    }
});

router.get('/user/connectons', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const myConnections = await ConnectionRequests.find({
            $or: [
                { fromUserId: loggedInUser._id, status: 'accepted' },
                { toUserId: loggedInUser._id, status: 'accepted' }
            ]
        }).populate('fromUserId', ['firstName', 'lastName'])
        .populate('toUserId', ['firstName', 'lastName']);

        const data = myConnections.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString())
                return row.toUserId;
            row.fromUserId;
        });

        res.status(200).json({
            message: 'Here are all your connections',
            data
        });
    } catch (error) {
        res.status(400).send('ERROR: ' + error.messgae);
    }
});

router.get('/feed', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequests.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).populate('toUserId', ['firstName', 'lastName']);

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString);
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) }},
                { _id: { $ne: loggedInUser._id }}
            ]
        });
        console.log(users);
        res.send(users);
        // res.status(200).send(connectionRequest);
    } catch (error) {
        res.status(400).send('ERROR: ' + error.messgae);
    }
})

export default router;