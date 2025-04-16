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
        const newUser = await user.save();

        const token = await user.getJWT();
        res.cookie('token', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
        res.status(200).json({ message: 'User added successfully', data: newUser });
    } catch (err) {
        res.status(400).send('Error in saving user: ' + err);
    }
}

export const loginController = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });

        if (!user) {
            throw new Error('Invalid Credentials');
        }

        const isValidPassword = await user.validatePassword(password);
        if (isValidPassword) {
            // TODO Create a JWT token
            const token = await user.getJWT();

            // TODO Add a token to cookie and sent the response back to the user
            res.cookie('token', token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            });

            res.send(user);
        } else {
            res.status(400).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        res.status(400).send('Error: ' + error.message);
    }
}

export const logoutController = async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now())
    });

    res.send('LOGOUT successfully');
}

