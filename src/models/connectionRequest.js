import mongoose from "mongoose";

const Schema = mongoose.Schema;

const connectionRequestSchema = new Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['ignore', 'interested', 'accepted', 'rejected'],
            message: `{ VALUE } is an icorrect status type`
        }
    }
}, { timestamps: true });

export default mongoose.model('connectionRequest', connectionRequestSchema);