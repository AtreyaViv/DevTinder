const express = require("express");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const {userAuth} = require('../middleware/auth');

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        validateSignUpData(req);
        const passwordhash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordhash
        });
        const id = await user.save();
        //console.log(id);
        res.send("User added successfully");
    }
    catch (err) {
        res.status(400).send("FAILED :" + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new Error("Invalid Credentials");
        }

        if (isPasswordValid) {
            const token = await user.getJWT();
            if (!token) {
                throw new Error("Error in token generation");
            }
            // console.log(token);
            res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true })
            res.send("User Login successfully");
        }

    } catch (error) {
        res.status(400).send("FAILED :" + error.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) })
    res.send("Logout successful!!!");
})


module.exports = authRouter;
