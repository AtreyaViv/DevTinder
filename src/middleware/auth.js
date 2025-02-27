const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next) => {
    const {token} = req.cookies;
    try {
        if(!token){
            throw new Error("Token missing, login again");
        }
        const decodedObj = await jwt.verify(token, "DevTinder@12345");
        const { _id } = decodedObj;
        const user = await User.findById(_id);
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("FAILED :" + error.message);
    }
}


module.exports = {
    userAuth
}