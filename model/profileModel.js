const mongoose = require("mongoose");

const profile = mongoose.Schema({
    username:{
        type: String,
        unique: true
    },
    name:{
        type: String
    },
    profession:{
        type: String
    },
    bio:{
        type:String
    }
}
)

module.exports = mongoose.model("profile",profile);