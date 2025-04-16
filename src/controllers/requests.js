import ConnectionRequest from '../models/connectionRequest.js';
import User from '../models/user.js';

export const connectionRequestController = async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const ALLOWED_STATUS = ['interested', 'ignored'];
        if (!ALLOWED_STATUS.includes(status)) {
            return res.status(400).json({
                message: 'Invalis status type: ' + status
            })
        }

        const existingUser = await User.findById(toUserId);
        if (!existingUser) {
            return res.status(400).json({
                message: "User not found"
            });            
        }

        // ! If there is an existing Connection Request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).json({
                message: 'Connection request already existed!!'
            })
        }

        const data = await connectionRequest.save();
        res.json({
            message: (status == 'ignored') ? (req.user.firstName + " is " + status + ' your request') : (req.user.firstName + " is " + status +  ' in ' + existingUser.firstName),
            data
        });
    } catch (error) {
        res.status(400).send('ERROR: ' + error.message);
    }
}

export const requestReviewController = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;
        console.log(status + '   ' + requestId);
        
        const ALLOWED_STATUS = ['accepted', 'rejected'];
        if (!ALLOWED_STATUS.includes(status)) {
            res.status(400).send('Invalid status: ' + status);
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: 'interested'
        });

        if (!connectionRequest) {
            return res.status(400).send('Connection request not found');
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({
            message: 'Connection request: ' + status,
            data
        });
    } catch (error) {
        res.status(400).send('ERROR: ' + error.message);
    }
}

