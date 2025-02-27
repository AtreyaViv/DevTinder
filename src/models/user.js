const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email Id is not valid");
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender Data is not Valid")
            }
        }
    }
},
    {
        timestamps: true
    });

userSchema.methods.getJWT = async function () {
    const token = await jwt.sign({ _id: this._id }, "DevTinder@12345", {
        expiresIn: '7d'
    });

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const passwordhash = this.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordhash);

    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;