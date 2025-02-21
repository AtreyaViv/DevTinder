const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    try{
        validateSignUpData(req);
        const passwordhash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            password : passwordhash
        });
        const id = await user.save();
        console.log(id);
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("FAILED :" + err.message);
    }
});

app.post("/login", async (req,res) => {
    try {
        const {email,password} = req.body;
        
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            throw new Error("Invalid Credentials");
        }

        res.send("User Login successfully");

    } catch (error) {
        res.status(400).send("FAILED :" + error.message);
    }
})

app.get("/feed", async (req,res) => {
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
        const user = await User.findOne({email : email});
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

app.patch("/user/:userId", async (req,res) => {
    const userId = req.params?.userId;
    const data = req.body;
    const ALLOWED_UPDATE = ["firstName", "lastName", "age", "gender"]
    try {

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument:'after',
            runValidators:'true'
        })

        console.log(user);
        res.send("User updated successfully");
        
    } catch (error) {
        res.status(400).send("UPDATE FAILED " + error.message);
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