const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");
const post = mongoose.Schema({
    username: String,
    title:{
        type: String,
        required: true,
    },
    body: {
        type: String
    },
    img:{
        type: String,
        default:""
    },
    likes: Number,
    shares: Number,
    comments:Number
})

module.exports = mongoose.model("post",post);