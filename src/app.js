const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {

    const user = new User({
        firstName : "Vivek",
        lastName : "Atreya",
        password : "Vivek@1234",
        email : "Vivek@Atreya.com",
        age : 28,
        gender : "Male"
    });

    try{
        const id = await user.save();
        console.log(id);
        res.send("User added successfully");
    }
    catch(err){
        res.send("Error");
        console.log(err);
    }
})

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
*/