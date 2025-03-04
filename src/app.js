const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser')
//const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


// app.patch("/user/:userId", async (req, res) => {
//     const userId = req.params?.userId;
//     const data = req.body;
//     const ALLOWED_UPDATE = ["firstName", "lastName", "age", "gender"]
//     try {

//         const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k));
//         if (!isUpdateAllowed) {
//             throw new Error("Update not allowed");
//         }
//         const user = await User.findByIdAndUpdate(userId, data, {
//             returnDocument: 'after',
//             runValidators: 'true'
//         })

//         console.log(user);
//         res.send("User updated successfully");

//     } catch (error) {
//         res.status(400).send("UPDATE FAILED " + error.message);
//     }
// })

connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(7777, () => {
            console.log("server is running on port 7777.....")
        });
    })
    .catch((err) => {
        console.error("Error while connecting Db");
    });

/* 
    complex statements in url..
    1. we can use - /ab+c (abbbbbbc, abc,)
    2. we can use - /ab*c (abc, ab gjfdkfcjvdkj c, abc)
    3. we can use - /ab?c (abc, ac)
    4. we can also use regular expressions here.

    app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users);
    } catch (error) {
        res.status(400).send("FAILED " + error.message);
    }
});

app.get("/user", async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email: email });
        res.send(user);

    } catch (error) {
        res.status(400).send("FAILED " + error.message);
    }
});

app.delete("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        console.log(user);
        res.send("User deleted successfully");
    } catch (error) {
        res.status(400).send("DELETE FAILED " + error.message);
    }
});
*/