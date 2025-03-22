import validator from 'validator';

export const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName || !emailId || !password) {
        throw new Error('Fill all the fields');
    }

    else if (!validator.isEmail(emailId)) {
        throw new Error('Not a valid Email');
    }

    else if (!validator.isStrongPassword(password)) {
        throw new Error('Please enter a strong password'); 
    }
}

export const validateEditProfileData = (req) => {
    const allowedEditFields = ['firstName', 'lastName', 'age', 'about', 'gender', 'photoUrl', 'skills'];
    const isEditAllowed = Object.keys(req.body).every(fields => 
        allowedEditFields.includes(fields)
    );

    return isEditAllowed;
}

export const validateNewPassword = (req) => {
    const newPassword = validator.isStrongPassword(req.body);

    return newPassword;
}