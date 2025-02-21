const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("fistname and lastname required");
    }
    if(!validator.isEmail(email)){
        throw new Error("Email is invalid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    }
}

module.exports = {
    validateSignUpData
}