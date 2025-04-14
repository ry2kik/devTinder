import { validateEditProfileData } from "../utils/validation.js";
import { validateNewPassword } from "../utils/validation.js";

export const profileViewController = async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send('ERROR: ', error.message);
    }
}

export const profileEditController = async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit request");
        }

        const loggedinUser = req.user;
        Object.keys(req.body).forEach(key => loggedinUser[key] = req.body[key]);
        await loggedinUser.save();

        res.json({ 
            message: "You've successfully edited your profile",
            data: loggedinUser
        });
    } catch (error) {
        res.status(400).send('ERROR: ' + error.message);
    }
}

export const forgotPassword = async (req, res) => {
    try {
        if (!validateNewPassword(req)){
            throw new Error("Weak Password");
        }
        
        const loggedinUser = req.user;
        const newPassword = req.body
    } catch (error) {
        res.status(400).send('ERROR: ' + error.message);
    }
}