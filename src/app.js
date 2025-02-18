const express = require("express");

const app = express();

app.use("/home", (req, res) => {
    console.log(req.url);
    res.send("This is home");
});

app.use("/test", (req, res) => {
    console.log(req.url);
    res.send("Namaste My dear!!!");
});

app.use("/", (req, res) => {
    console.log(req.url);
    res.send("Hello from the server");
    
});

app.listen(7777, () => {
    console.log("server is running on port 7777.....")
});