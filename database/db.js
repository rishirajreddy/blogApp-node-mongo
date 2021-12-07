const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();

// const URI = "mongodb+srv://NodeDB:mrrobot@cluster0.qu2hz.mongodb.net/postApp?retryWrites=true&w=majority";
// const URI = "mongodb://localhost:27017/postsApp";
const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE.toString(),{
        useNewUrlParser : true, useUnifiedTopology: true
    });
    console.log('Connected to mongoDB..');
};

module.exports = connectDB;
