const express = require("express");
const app = express();
const connectDB = require("./database/db");
const posts_router = require("./routes/routes")
const user_router = require("./routes/users");
const profile_router = require("./routes/profile_routes");

var Port = process.env.Port || 3000;

connectDB();  

app.use(express.json({extended:  false}));
app.use("/",(req,res) => {res.send("Welcome to Node+MongoDB")})
app.use("/api/v1/posts",posts_router);    
app.use("/api/v1/users",user_router);  
app.use("/api/v1/profile",profile_router);  
// app.use("/api/v1/pen",router);


// app.use("/",router);
app.listen(Port,() => {
    console.log(`Listening to port ${Port}...`);
})