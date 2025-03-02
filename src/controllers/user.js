import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { validateSignUpData } from '../utils/validation.js';

export const signupController = async (req, res) => {
    try {
        // TODO Validation of Data
        validateSignUpData(req);

        // TODO Encrypt the password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        // TODO Creating the new instance of the User Model
        const user = new User({ firstName, lastName, emailId, password: passwordHash });
        await user.save();
        res.status(200).send('User added successfully');
    } catch(err) {
        res.status(400).send('Error in saving user: ', err.messgae);
    }
}

export const loginController = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });
 
        if (!user) {
            throw new Error('Invalid Credentials');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Not a valid password');
        } else {
            res.send('User logged in successfully');
        }
    } catch (error) {
        res.status(400).send('ERROR: ', error.messgae); 
    }
}

export const getUsers = async (req, res) => {
    const emailId = req.body.emailId;

    try {
        const users = await User.find({ emailId: emailId });
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error.messgae);
    }
}

export const feedController = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.messgae);
    }
}

export const patchController = async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATE_FILELDS = ['userId', 'age', 'gender', 'photoUrl', 'about', 'skills'];
        const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATE_FILELDS.includes(k));
        if (!isUpdateAllowed) {
            throw new Error('Update not allowed');
        }

        if (data.skills.length > 10) {
            throw new Error('Skilld cannot be more than 10');
        }

        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: 'after',
            runValidators: true
        });

        console.log(user);
        return res.status(200).send('User updated successfully');
    } catch(err) {
        return res.status(400).send('UPDATE FAILED: ', err.messgae);
    }
}