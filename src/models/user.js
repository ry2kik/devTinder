import mongoose from "mongoose";
import validator from 'validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Not a valid email address');
        }
    },
    password: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) throw new Error('Enter a strong password');
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!['male', 'female', 'others'].includes(value)) {
                throw new Error('Gender data is not valid');
            }
        }
    },
    photoUrl: {
        type: String,
        validate(value) {
            if (!validator.isURL(value)) throw new Error('Not a valid url');
        }
    },
    about: {
        type: String,
        default:  'This is a default about of the user!'
    },
    skills: {
        type: [String]
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
