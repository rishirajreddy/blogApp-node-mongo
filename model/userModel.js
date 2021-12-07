const mongoose = require("mongoose");
const user = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type:  String,
        unique: true
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model("user",user);