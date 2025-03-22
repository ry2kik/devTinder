import ConnectionRequest from '../models/connectionRequest.js';

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

        // ! If there is an existing Connection Request
        const existingConnectionRequest = await connectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return status(400).json({
                message: 'Connection request already existed!!'
            })
        }

        const data = await connectionRequest.save();
        res.json({
            message: 'Connection request sent successfully!',
            data
        });
    } catch (error) {
        res.status(400).send('ERROR: ', error.message);
    }
}