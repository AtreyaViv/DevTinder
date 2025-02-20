const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://atreyavivek9:Bc62wVOOKaLDZ2Pr@cluster0.wqhmz.mongodb.net/DevTinder")
}

module.exports = connectDB;