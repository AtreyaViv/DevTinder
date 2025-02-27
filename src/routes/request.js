const express = require("express");
const {userAuth} = require('../middleware/auth');

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req,res) => {
    try {
        res.send(req.user.firstName + "  sent you a connection request");
        
    } catch (error) {
        res.status(400).send("FAILED :" + error.message);
    }
})

module.exports = requestRouter;