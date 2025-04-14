import express from 'express';
import User from '../models/user.js';
import { userAuth } from '../middlewares/auth.js';
import ConnectionRequests from '../models/connectionRequest.js';
const router = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

router.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequests.find({
            toUserId: loggedInUser._id,
            status: 'interested'
        }).populate('fromUserId', [USER_SAFE_DATA]);

        res.status(200).json({
            message: 'Data fetched successfully',
            data: connectionRequests
        });
    } catch (error) {
        res.status(400).send('ERROR: ' + error.message);
    }
});

router.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const myConnections = await ConnectionRequests.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ]
        }).populate('fromUserId', USER_SAFE_DATA)
        .populate('toUserId', USER_SAFE_DATA);

        const data = myConnections.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString())
                return row.toUserId;
            return row.fromUserId;
        });

        res.status(200).json({
            message: 'Here are all your connections',
            data
        });
    } catch (error) {
        res.status(400).send('ERROR: ' + error);
    }
});

router.get('/feed', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        limit = limit > 50 ? 50 : limit;

        const connectionRequest = await ConnectionRequests.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select('fromUserId toUserId');

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) }},
                { _id: { $ne: loggedInUser._id }}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        res.send(users);
        // res.status(200).send(connectionRequest);
    } catch (error) {
        res.status(400).send('ERROR: ' + error);
    }
})

export default router;