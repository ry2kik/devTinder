import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const userAuth = async (req, res, next) => {
    try {
        // TODO Read the token from the req.cookies
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send('Please login first!!!');
        }

        // TODO Validate the token
        const decodedObj = await jwt.verify(token, 'DEV@Tinder$2000');
        // const decodedObj = await User.verifyToken(token);

        // TODO Find the user
        const { _id } = decodedObj;
        const user = await User.findOne({ _id });
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }

}